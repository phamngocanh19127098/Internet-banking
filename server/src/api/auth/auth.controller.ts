import {
  Controller,
  Post,
  UseGuards,
  Get,
  Headers,
  Body,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IResponseData } from 'src/interface';
import { JwtAuthGuard } from 'src/commons/guard/jwt.guard';
import {
  ChangeUserPasswordDto,
  CreateUserDto,
  LoginUserDto,
} from 'src/api/users/dto/user.dto';

import { AuthService } from './auth.service';
import { Roles } from 'src/commons/decorator/roles.decorator';
import { Role } from '../users/entity/user.entity';
import { RequestRefreshTokenDto } from './dto/RequestRefreshToken.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Post('signup')
  signup(
    @Body() dto: CreateUserDto,
    @Headers('authorization') authorization: string,
  ): Promise<IResponseData> {
    return this.authService.signup(dto, authorization);
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
  refresh(@Body() body: RequestRefreshTokenDto): Promise<IResponseData> {
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
