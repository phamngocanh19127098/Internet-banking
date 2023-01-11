import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hash } from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomstring = require('randomstring');

import type { IResponseData, IToken } from 'src/interface';
import { AccountsService } from '../accounts/accounts.service';
import { UserService } from 'src/api/users/user.service';
import { Role, User } from 'src/api/users/entity/user.entity';
import {
  ChangeUserPasswordDto,
  CreateUserDto,
  LoginUserDto,
} from 'src/api/users/dto/user.dto';
import {
  IncorrectOldPasswordException,
  InvalidTokenException,
  PasswordAndConfirmPasswordNotMatchException,
} from 'src/commons/filters/exceptions/auth';
import { generateOTPCode } from 'src/commons/otp-generate/OtpGenerate';
import {
  CreateForgotPasswordOtpDto,
  VerifyForgotPasswordDto,
} from '../otp/dto/otp.dto';
import { OtpService } from '../otp/otp.service';
import { sendMail } from 'src/commons/mailing/nodemailer';
import { InvalidOtpException } from 'src/commons/filters/exceptions/otp/InvalidOtpException';
import { OtpExpiredTimeException } from 'src/commons/filters/exceptions/otp/OtpExpiredTimeException';
import { Account } from '../accounts/entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private accountService: AccountsService,
    private jwtService: JwtService,
    private otpService: OtpService,
    private config: ConfigService,
  ) {}

  async signup(dto: CreateUserDto, client): Promise<IResponseData> {
    const user = await this.userService.create(dto);

    let account: Account;

    if (dto.role === Role.CUSTOMER) {
      const employeeId = client.id;

      account = await this.accountService.create({
        customerId: user.id,
        currentBalance: 0,
        createdBy: employeeId,
      });

      delete user.password;

      return {
        data: { ...user, accountNumber: account.accountNumber },
        statusCode: 200,
        message: 'Đăng ký người dùng thành công.',
      };
    } else {
      delete user.password;

      let message: string;

      if (user.role === Role.ADMIN) {
        message = 'Đăng ký admin thành công.';
      } else {
        message = 'Đăng ký nhân viên thành công.';
      }
      return {
        data: user,
        statusCode: 200,
        message,
      };
    }
  }

  async login(loginDto: LoginUserDto): Promise<IResponseData> {
    const user = await this.userService.getByLogin(loginDto);
    const token = await this.signToken(user);

    delete user.password;
    delete user.refreshToken;

    return {
      data: user,
      metadata: token,
      statusCode: 200,
      message: 'Đăng nhập thành công.',
    };
  }

  async changePassword(dto: ChangeUserPasswordDto): Promise<IResponseData> {
    const user = await this.userService.getByUsername(dto.username);

    const checkPassword = compareSync(dto.password, user.password);

    if (!checkPassword) {
      throw new IncorrectOldPasswordException();
    }

    const checkNewPassword = compareSync(dto.newPassword, user.password);

    if (checkNewPassword) {
      throw new PasswordAndConfirmPasswordNotMatchException();
    }

    dto.newPassword = await hash(dto.newPassword, 10);

    await this.userService.updateEmployee(user.id, {
      ...user,
      password: dto.newPassword,
    });

    delete user.password;
    delete user.refreshToken;

    return {
      data: user,
      statusCode: 200,
      message: 'Đổi mật khẩu thành công.',
    };
  }

  async validateUser(username: string): Promise<User> {
    const user = await this.userService.getByUsername(username);

    if (!user) {
      throw new InvalidTokenException();
    }

    return user;
  }

  async signToken(user: User, refresh = false): Promise<IToken> {
    const accessToken = this.jwtService.sign({
      username: user.username,
      id: user.id,
      role: user.role,
    });

    if (!refresh) {
      const refreshToken = this.jwtService.sign(
        { username: user.username },
        {
          secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
        },
      );

      await this.userService.updateRefreshToken(user.username, refreshToken);

      return {
        accessToken,
        expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        refreshToken,
        refreshExpiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      };
    } else {
      return {
        accessToken,
        expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      };
    }
  }

  async refresh(refreshToken: string): Promise<IResponseData> {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
      });

      const user = await this.userService.getByRefresh(
        refreshToken,
        payload.username,
      );

      const token = await this.signToken(user, true);

      return {
        data: user,
        metadata: token,
        statusCode: 200,
        message: 'Tái tạo refresh token thành công.',
      };
    } catch (e) {
      throw new InvalidTokenException();
    }
  }

  async logout(user: User): Promise<void> {
    await this.userService.updateRefreshToken(user.username, null);
  }

  async forgotPassword({ username }) {
    const user = await this.userService.getByUsername(username);

    if (!user) {
      throw new BadRequestException(
        'Không tìm thấy người dùng khi quên mật khẩu',
      );
    }

    const otpCode = generateOTPCode();

    const otpForgotPasswordDto = new CreateForgotPasswordOtpDto(
      user.id,
      otpCode,
    );

    await this.otpService.createForgotPasswordOtp(otpForgotPasswordDto);

    const otpExpireTime = Number(process.env.OTP_EXPIRATION_TIME) / 60000 || 1;

    await sendMail({
      to: user.email,
      subject: `OTP Forgot Password Verification `,
      html: `<p>Dear <strong>${user.name}</strong>,</p>
          <p>Your <strong>OTP </strong>(expires in ${otpExpireTime} minute)&nbsp;for confirming forgot password is: <strong>${otpCode}</strong></p>
          <p>Please use this Passcode to complete your transaction. Do not share this Passcode with anyone.</p>
          <p>Thank you,</p>
          <p><strong>TAIXIU BANK</strong></p>`,
    });

    return {
      statusCode: 200,
      message: 'Quên mật khẩu thành công.',
    };
  }

  async verifyForgotPassword(dto: VerifyForgotPasswordDto) {
    const user = await this.userService.getByUsername(dto.username);

    if (!user) {
      throw new BadRequestException(
        'Không tìm thấy người dùng khi xác nhận quên mật khẩu',
      );
    }

    const lastOtp = await this.otpService.getLastestOtpByForgetPassword(
      user.id,
    );

    const currTime = new Date();
    currTime.setHours(currTime.getHours() - 7);
    const otpExpirationTime = parseInt(
      process.env.OTP_EXPIRATION_TIME || '60000',
    );
    if (currTime.getTime() - lastOtp.createdAt.getTime() > otpExpirationTime) {
      throw new OtpExpiredTimeException();
    } else if (lastOtp.otpCode !== dto.otpCode) {
      throw new InvalidOtpException();
    }

    let pass = randomstring.generate(30);

    console.log('Password:', pass);

    await sendMail({
      to: user.email,
      subject: 'Your password for Taixiu Bank',
      html: `<p>Dear <strong>${user.name}</strong>,</p>
          <p>Your password is: <strong>${pass}</strong></p>
          <p>Thank for using our bank,</p>
          <p><strong>TAIXIU BANK</strong></p>`,
    });

    pass = await hash(pass, 10);

    await this.userService.updateEmployee(user.id, {
      ...user,
      password: pass,
    });

    return {
      data: user,
      statusCode: 200,
      message: 'Xác nhận quên mật khẩu thành công.',
    };
  }
}
