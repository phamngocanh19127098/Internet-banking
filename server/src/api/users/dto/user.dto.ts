import { PartialType } from '@nestjs/mapped-types';
import { Allow, IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { Role } from 'src/api/users/entity/user.entity';

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

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Allow()
  name: string;

  @Allow()
  password: string;

  @Allow()
  dob: Date;

  @Allow()
  phone: string;

  @Allow()
  address: string;

  @Allow()
  status: number;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ChangeUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
