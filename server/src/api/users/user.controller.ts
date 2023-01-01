import {Body, Controller, Delete, Get, Param, Post, Put,} from '@nestjs/common';
import {ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger/dist';

import {CreateUserDto, UpdateUserDto} from './dto/user.dto';
import {UserService} from './user.service';
import {Role, User} from './entity/user.entity';
import {Roles} from "../../commons/decorator/roles.decorator";
import {ApiOkResponse} from "@nestjs/swagger";

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Roles(Role.EMPLOYEE)
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @ApiOkResponse({
    description: "Lấy danh sách nhân viên thành công"
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized"
  })
  @Get('employee/list')
  async findAllEmployee() {
    let data = await this.userService.findAllEmployee();
    return {
      statusCode: 200,
      message: "Lấy danh sách nhân viên thành công",
      data
    }
  }

  @Roles(Role.ADMIN)
  @ApiOkResponse({
    description: "Cập nhập thông tin nhân viên thành công"
  })
  @Put('employee/:id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
     await this.userService.updateEmployee(+id, updateUserDto);
     return {
       statusCode: 200,
       message: "Cập nhập thông tin nhân viên thành công"
     }
  }

  @Roles(Role.ADMIN)
  @ApiOkResponse({
    description : "Xóa nhân viên thành công"
  })
  @Delete('employee/:id')
  async removeEmployee(@Param('id') id: string) {
     await this.userService.removeEmployee(+id);
    return {
      statusCode: 200,
      message: "Xóa nhân viên thành công"
    }
  }

  @Roles(Role.CUSTOMER)
  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    return await this.userService.findUserById(+id);
  }
}
