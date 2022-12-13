import { Controller, Post, UseGuards, Get, Body, Req } from '@nestjs/common';

import { JwtAuthGuard } from 'src/commons/guard/jwt.guard';
import { CreateUserDto, LoginUserDto } from 'src/api/users/dto/user.dto';

import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    const { id, username, refreshToken, updatedAt } = req.user;

    return { id, username, refreshToken, updatedAt };
  }

  @Post('refresh')
  refresh(@Body() body) {
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
}
