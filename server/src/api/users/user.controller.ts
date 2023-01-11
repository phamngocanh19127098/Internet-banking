import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger/dist';

import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Role, User } from './entity/user.entity';
import { Roles } from '../../commons/decorator/roles.decorator';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ description: 'Tạo người dùng. Employee mới dùng được.' })
  @ApiCreatedResponse({
    description: 'Tạo người dùng thành công',
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
    description: 'Xảy ra lỗi từ server khi tạo người dùng',
  })
  @ApiBearerAuth()
  @Post()
  @Roles(Role.EMPLOYEE)
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @ApiOperation({
    description: 'Lấy danh sách nhân viên. Admin mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Lấy danh sách nhân viên thành công',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi lấy danh sách nhân viên',
  })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Get('employee/list')
  async findAllEmployee() {
    const data = await this.userService.findAllEmployee();
    return {
      statusCode: 200,
      message: 'Lấy danh sách nhân viên thành công',
      data,
    };
  }

  @ApiOperation({
    description: 'Lấy danh sách khách hàng. Employee mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Lấy danh sách khách hàng thành công',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi lấy danh sách khách hàng',
  })
  @ApiBearerAuth()
  @Roles(Role.EMPLOYEE)
  @Get('customer/list')
  async findAllCustomer() {
    const data = await this.userService.findAllCustomer();
    return {
      statusCode: 200,
      message: 'Lấy danh sách khách hàng thành công',
      data,
    };
  }

  @ApiOperation({
    description: 'Cập nhập thông tin nhân viên. Admin mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Cập nhập thông tin nhân viên thành công',
  })
  @ApiBadRequestResponse({
    description: 'Không tìm thấy nhân viên hoặc sai kiểu dữ liệu',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi cập nhật thông tin nhân viên',
  })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Put('employee/:id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateEmployee(+id, updateUserDto);
    return {
      statusCode: 200,
      message: 'Cập nhập thông tin nhân viên thành công',
    };
  }

  @ApiOperation({ description: 'Xóa nhân viên. Admin mới dùng được.' })
  @ApiOkResponse({
    description: 'Xóa nhân viên thành công',
  })
  @ApiBadRequestResponse({
    description: 'Không tìm thấy nhân viên hoặc sai kiểu dữ liệu',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi xoá nhân viên',
  })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Delete('employee/:id')
  async removeEmployee(@Param('id') id: string) {
    await this.userService.removeEmployee(+id);
    return {
      statusCode: 200,
      message: 'Xóa nhân viên thành công',
    };
  }

  @ApiOperation({
    description: 'Tìm kiếm người dùng bằng ID. Vai trò nào cũng dùng được.',
  })
  @ApiOkResponse({
    description: 'Tìm kiếm người dùng bằng ID thành công',
  })
  @ApiBadRequestResponse({
    description: 'Không tìm thấy người dùng hoặc sai kiểu dữ liệu',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi tìm kiếm người dùng bằng ID',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER, Role.ADMIN, Role.EMPLOYEE)
  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(+id);

    delete user.password;

    return user;
  }

  @ApiOperation({
    description: 'Tìm kiếm người dùng bằng Username. Vai trò : employee, admin',
  })
  @ApiOkResponse({
    description: 'Tìm kiếm người dùng bằng username thành công',
  })
  @ApiBadRequestResponse({
    description: 'Không tìm thấy khách hàng này',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi tìm kiếm người dùng bằng Username',
  })
  @ApiBearerAuth()
  // @Roles( Role.ADMIN, Role.EMPLOYEE)
  @Get('/get-customer/:username')
  async findUserByUsername(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);

    if (!user) throw new BadRequestException('Không tìm thấy khách hàng này');
    delete user.password;
    delete user.refreshToken;

    return {
      statusCode: 200,
      message: 'Tìm kiếm người dùng bằng username thành công',
      data: {
        user: user,
      },
    };
  }

  @ApiOperation({
    description: 'Đóng tài khoản. Employee, customer mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Đóng tài khoản thành công',
  })
  @ApiBadRequestResponse({
    description: 'Không tìm thấy người dùng hoặc sai kiểu dữ liệu',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi cập nhật thông tin nhân viên',
  })
  @ApiBearerAuth()
  @Roles(Role.EMPLOYEE, Role.CUSTOMER)
  @Put('changestatus/:username')
  async lockUserAccount(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    await this.userService.updateEmployee(user.id, {
      ...user,
      status: user.status ? 0 : 1,
    });

    return {
      statusCode: 200,
      message: 'Đóng tài khoản thành công',
    };
  }
}
