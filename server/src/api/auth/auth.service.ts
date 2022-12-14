import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hash } from 'bcrypt';

import type { UsernameWithMetadata, Token } from 'src/commons/interface';
import { UserService } from 'src/api/users/user.service';
import { User } from 'src/api/users/entity/user.entity';
import {
  ChangeUserPasswordDto,
  CreateUserDto,
  LoginUserDto,
} from 'src/api/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(dto);

    return user;
  }

  async login(loginDto: LoginUserDto): Promise<UsernameWithMetadata> {
    const user = await this.userService.getByLogin(loginDto);
    const token = await this.signToken(user.username);

    return {
      username: user.username,
      metadata: token,
    };
  }

  async changePassword(dto: ChangeUserPasswordDto): Promise<User> {
    // Handle on FE
    // if (dto.newPassword !== dto.confirmNewPassword) {
    //   throw new BadRequestException(
    //     'Confirm new password not match new password',
    //   );
    // }

    const user = await this.userService.getByUsername(dto.username);

    const checkPassword = compareSync(dto.password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException('Old password is wrong');
    }

    const checkNewPassword = compareSync(dto.newPassword, user.password);

    if (checkNewPassword) {
      throw new ForbiddenException('New password cannot match old one.');
    }

    dto.newPassword = await hash(dto.newPassword, 10);

    await this.userService.updateEmployee(user.id, {
      ...user,
      password: dto.newPassword,
    });

    return user;
  }

  async validateUser(username: string): Promise<User> {
    const user = await this.userService.getByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }

  async signToken(username: string, refresh = false): Promise<Token> {
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

  async refresh(refreshToken: string): Promise<UsernameWithMetadata> {
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
        username: user.username,
        metadata: token,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async logout(user: User): Promise<void> {
    await this.userService.updateRefreshToken(user.username, null);
  }
}
