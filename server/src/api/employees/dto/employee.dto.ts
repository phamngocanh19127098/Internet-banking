import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

export class LoginEmployeeDto extends PartialType(CreateEmployeeDto) {}
