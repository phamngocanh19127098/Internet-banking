import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { IResponseData } from 'src/interface';
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
import { User } from 'src/commons/decorator/user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOperation({ description: 'Đăng ký tài khoản' })
  @ApiCreatedResponse({
    description: 'Tạo tài khoản thành công',
  })
  @ApiBadRequestResponse({
    description: 'Username hoặc Email đã tồn tại hoặc sai kiểu dữ liệu',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi đăng ký tài khoản',
  })
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Post('signup')
  signup(@Body() dto: CreateUserDto, @User() client): Promise<IResponseData> {
    return this.authService.signup(dto, client);
  }

  @ApiOperation({ description: 'Đăng nhập' })
  @ApiOkResponse({ description: 'Đăng nhập thành công' })
  @ApiBadRequestResponse({
    description: 'Tài khoản hoặc mật khẩu không đúng hoặc sai kiểu dữ liệu',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi đăng nhập',
  })
  @Post('login')
  login(@Body() dto: LoginUserDto): Promise<IResponseData> {
    return this.authService.login(dto);
  }

  @ApiOperation({ description: 'Đổi mật khẩu tài khoản' })
  @ApiOkResponse({ description: 'Đổi mật khẩu thành công' })
  @ApiBadRequestResponse({
    description:
      'Mật khẩu cũ không đúng hoặc mật khẩu không trùng khớp hoặc sai kiểu dữ liệu',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi đổi mật khẩu',
  })
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.CUSTOMER)
  @Post('changepassword')
  changePassword(@Body() dto: ChangeUserPasswordDto): Promise<IResponseData> {
    return this.authService.changePassword(dto);
  }

  @ApiOperation({ description: 'Đăng xuất tài khoản' })
  @ApiOkResponse({ description: 'Đăng xuất thành công' })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi đăng xuất',
  })
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.EMPLOYEE)
  @Post('logout')
  async logout(@Req() req) {
    await this.authService.logout(req.user);
    return {
      statusCode: 200,
      message: 'Đăng xuất thành công.',
    };
  }

  @ApiOperation({ description: 'Lấy thông tin người dùng' })
  @ApiOkResponse({ description: 'Lấy profile thành công' })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi lấy thông tin người dùng',
  })
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.EMPLOYEE)
  @Get('profile')
  async getProfile(@Req() req) {
    const { id } = req.user;

    const user = await this.userService.getUserById(id);

    delete user.password;

    return { data: user, statusCode: 200, message: 'Lấy profile thành công.' };
  }

  @ApiOperation({ description: 'Tái tạo access token' })
  @ApiOkResponse({ description: 'Tái tạo access token thành công' })
  @ApiBadRequestResponse({ description: 'Sai kiểu dữ liệu' })
  @ApiUnauthorizedResponse({
    description: 'Refresh Token không khả dụng',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi tái tạo access token',
  })
  @Post('refresh')
  refresh(@Body() body: RequestRefreshTokenDto): Promise<IResponseData> {
    return this.authService.refresh(body.refreshToken);
  }

  @ApiOperation({ description: 'Quên mật khẩu' })
  @ApiOkResponse({ description: 'Quên mật khẩu thành công' })
  @ApiBadRequestResponse({ description: 'Sai username hoặc sai kiểu dữ liệu' })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi quên mật khẩu',
  })
  @Post('forgotpassword')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @ApiOperation({ description: 'Xác nhận quên mật khẩu' })
  @ApiOkResponse({ description: 'Xác nhận quên mật khẩu thành công' })
  @ApiBadRequestResponse({
    description: 'Sai username hoặc sai otp hoặc sai kiểu dữ liệu',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi xác nhận mật khẩu',
  })
  @Post('forgotpassword/verify')
  verifyForgotPassword(@Body() dto: VerifyForgotPasswordDto) {
    return this.authService.verifyForgotPassword(dto);
  }
}
