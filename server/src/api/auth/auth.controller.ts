import { Controller, Post, UseGuards, Get, Body, Req } from '@nestjs/common';

import { LocalAuthGuard } from 'src/commons/guard/local.guard';
import { JwtAuthGuard } from 'src/commons/guard/jwt.guard';
import {
  CreateEmployeeDto,
  LoginEmployeeDto,
} from 'src/api/employees/dto/employee.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateEmployeeDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() dto: LoginEmployeeDto) {
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
