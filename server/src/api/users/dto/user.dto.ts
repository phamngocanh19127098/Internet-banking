import { Allow, IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { Role } from 'src/api/users/entity/user.entity';
import {PartialType} from "@nestjs/mapped-types";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Allow()
  role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
