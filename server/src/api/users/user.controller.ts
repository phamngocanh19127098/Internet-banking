import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';

import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createAccount(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }
}
