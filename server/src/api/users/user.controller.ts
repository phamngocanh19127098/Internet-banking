import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';

import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Get('getAllEmployee')
  findAllEmployee() {
    return this.userService.findAllEmployee();
  }

  @Patch('updateEmployee/:id')
  updateEmployee(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateEmployee(+id, updateUserDto);
  }

  @Delete('deleteEmployee/:id')
  removeEmployee(@Param('id') id: string) {
    return this.userService.removeEmployee(+id);
  }
}
