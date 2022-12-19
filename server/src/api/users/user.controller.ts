import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards,} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger/dist';

import {CreateUserDto, UpdateUserDto} from './dto/user.dto';
import {UserService} from './user.service';
import {Role, User} from './entity/user.entity';
import {Roles} from "../../commons/decorator/roles.decorator";
import {JwtAuthGuard} from "../../commons/guard/jwt.guard";

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get('employee/list')
  findAllEmployee() {
    return this.userService.findAllEmployee();
  }

  @Put('employee/:id')
  updateEmployee(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateEmployee(+id, updateUserDto);
  }

  @Delete('employee/:id')
  removeEmployee(@Param('id') id: string) {
    return this.userService.removeEmployee(+id);
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    return await this.userService.findUserById(+id);
  }
}
