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
import { UserService } from '../users/user.service';
import { ForgotPasswordDto } from './dto/ForgotPasswordDto';
import { VerifyForgotPasswordDto } from '../otp/dto/otp.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

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

  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @Post('changepassword')
  changePassword(@Body() dto: ChangeUserPasswordDto): Promise<IResponseData> {
    return this.authService.changePassword(dto);
  }

  @Roles(Role.ADMIN, Role.CUSTOMER, Role.EMPLOYEE)
  @Post('logout')
  async logout(@Req() req) {
    await this.authService.logout(req.user);
    return {
      statusCode: 200,
      message: 'Đăng xuất thành công.',
    };
  }

  @Roles(Role.ADMIN, Role.CUSTOMER, Role.EMPLOYEE)
  @Get('profile')
  async getProfile(@Req() req) {
    const { id } = req.user;

    const user = await this.userService.getUserById(id);

    delete user.password;

    return { data: user, statusCode: 200, message: 'Lấy profile thành công.' };
  }

  @Post('refresh')
  refresh(@Body() body: RequestRefreshTokenDto): Promise<IResponseData> {
    return this.authService.refresh(body.refreshToken);
  }

  @Post('forgotpassword')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('forgotpassword/verify')
  verifyForgotPassword(@Body() dto: VerifyForgotPasswordDto) {
    return this.authService.verifyForgotPassword(dto);
  }
}
