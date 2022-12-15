import { Controller, Post, UseGuards, Get, Body, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IResponseData } from 'src/interface';
import { JwtAuthGuard } from 'src/commons/guard/jwt.guard';
import {
  ChangeUserPasswordDto,
  CreateUserDto,
  LoginUserDto,
} from 'src/api/users/dto/user.dto';

import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto): Promise<IResponseData> {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUserDto): Promise<IResponseData> {
    return this.authService.login(dto);
  }

  @Post('changepassword')
  changePassword(@Body() dto: ChangeUserPasswordDto): Promise<IResponseData> {
    return this.authService.changePassword(dto);
  }

  // Maybe delete when handled auto refresh
  @Post('refresh')
  refresh(@Body() body): Promise<IResponseData> {
    return this.authService.refresh(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    await this.authService.logout(req.user);
    return {
      statusCode: 200,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    const { id, username, refreshToken, updatedAt } = req.user;

    return { id, username, refreshToken, updatedAt };
  }
}
