import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { Role } from 'src/api/users/entity/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'user',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'user@gmail.com',
  })
  email: string;

  @Allow()
  @ApiProperty({
    required: true,
    example: 'admin',
  })
  role: Role;

  @Allow()
  @IsString()
  @ApiProperty({
    name : "Anh Pham"
  })
  name : string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Allow()
  @ApiProperty({
    required: false,
    example: 'ngocanh',
  })
  name: string;

  @Allow()
  password: string;

  @Allow()
  @ApiProperty({
    required: false,
    example: '2001-01-01',
  })
  dob: Date;

  @Allow()
  @ApiProperty({
    required: false,
    example: '0908123321',
  })
  phone: string;

  @Allow()
  @ApiProperty({
    required: false,
    example: 'Hoang Quoc Viet, Quan 7, TP HCM',
  })
  address: string;

  @Allow()
  @ApiProperty({
    required: false,
    default: 0,
    example: 1,
  })
  status: number;

  @ApiProperty({
    required: false,
    example: 'user2@gmail.com',
  })
  email: string;

  @ApiProperty({
    required: false,
    example: 'employee',
  })
  role: Role;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'admin',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'admin',
  })
  password: string;
}

export class ChangeUserPasswordDto extends PartialType(LoginUserDto) {
  @ApiProperty({
    required: true,
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    required: true,
    example: 'admin',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'user123',
  })
  newPassword: string;
}
