import {
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

  @ApiOperation({ description: 'Tạo người dùng' })
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

  @ApiOperation({ description: 'Lấy danh sách nhân viên' })
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

  @ApiOperation({ description: 'Cập nhập thông tin nhân viên' })
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

  @ApiOperation({ description: 'Xóa nhân viên' })
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

  @ApiOperation({ description: 'Tìm kiếm người dùng bằng ID' })
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
  @Roles(Role.CUSTOMER)
  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(+id);

    delete user.password;

    return user;
  }
}
