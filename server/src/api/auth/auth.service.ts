import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hash } from 'bcrypt';

import type { IResponseData, IToken } from 'src/interface';
import { UserService } from 'src/api/users/user.service';
import { User } from 'src/api/users/entity/user.entity';
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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: CreateUserDto): Promise<IResponseData> {
    const user = await this.userService.create(dto);

    delete user.password;

    return {
      data: user,
      statusCode: 200,
      message: 'Đăng ký người dùng thành công.',
    };
  }

  async login(loginDto: LoginUserDto): Promise<IResponseData> {
    const user = await this.userService.getByLogin(loginDto);
    const token = await this.signToken(user.username);

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
    // Handle on FE
    // if (dto.newPassword !== dto.confirmNewPassword) {
    //   throw new BadRequestException(
    //     'Confirm new password not match new password',
    //   );
    // }

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

  async signToken(username: string, refresh = false): Promise<IToken> {
    const accessToken = this.jwtService.sign({ username });

    if (!refresh) {
      const refreshToken = this.jwtService.sign(
        { username },
        {
          secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
        },
      );

      await this.userService.updateRefreshToken(username, refreshToken);

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

      const token = await this.signToken(user.username, true);

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
}
