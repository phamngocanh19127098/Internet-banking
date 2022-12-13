import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/api/users/user.service';
import { User } from 'src/api/users/entity/user.entity';
import { CreateUserDto, LoginUserDto } from 'src/api/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    return {
      username: user.username,
    };
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.userService.getByLogin(loginDto);
    const token = await this.signToken(user.username);

    return {
      username: user.username,
      ...token,
    };
  }

  async validateUser(username: string): Promise<User> {
    const user = await this.userService.getByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }

  async signToken(username: string, refresh = false) {
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
        expiresInRefresh: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      };
    } else {
      return {
        accessToken,
        expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      };
    }
  }

  async refresh(refreshToken: string) {
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
        ...token,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async logout(user: User) {
    await this.userService.updateRefreshToken(user.username, null);
  }
}
