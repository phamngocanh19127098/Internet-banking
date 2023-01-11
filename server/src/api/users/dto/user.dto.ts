import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { Role } from 'src/api/users/entity/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tên tài khoản của tài khoản',
    required: true,
    example: 'user1000',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email của tài khoản',
    required: true,
    example: 'user1000@gmail.com',
  })
  email: string;

  @Allow()
  @ApiProperty({
    description: 'Vai trò của tài khoản',
    required: true,
    example: 'customer',
  })
  role: Role;

  @IsString()
  @ApiProperty({
    example: 'Anh Pham',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: '0908123321',
  })
  phone: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Allow()
  @ApiProperty({
    description: 'Tên của chủ tài khoản',
    required: false,
    example: 'ngocanh',
  })
  name: string;

  @Allow()
  password: string;

  @Allow()
  @ApiProperty({
    description: 'Ngày sinh của chủ tài khoản',
    required: false,
    example: '2001-01-01',
  })
  dob: Date;

  @Allow()
  @ApiProperty({
    description: 'Số điện thoại của chủ tài khoản',
    required: false,
    example: '0908123321',
  })
  phone: string;

  @Allow()
  @ApiProperty({
    description: 'Địa chỉ nơi ở của chủ tài khoản',
    required: false,
    example: 'Hoang Quoc Viet, Quan 7, TP HCM',
  })
  address: string;

  @Allow()
  @ApiProperty({
    description: 'Trạng thái của tài khoản',
    required: false,
    default: 0,
    example: 1,
  })
  status: number;

  @ApiProperty({
    description: 'Email của chủ tài khoản',
    required: false,
    example: 'user2@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Vai trò của tài khoản',
    required: false,
    example: 'employee',
  })
  role: Role;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tên tài khoản của tài khoản',
    required: true,
    example: 'admin',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Mật khẩu của chủ tài khoản',
    required: true,
    example: '123123',
  })
  password: string;
}

export class ChangeUserPasswordDto extends PartialType(LoginUserDto) {
  @ApiProperty({
    description: 'Tên tài khoản của tài khoản',
    required: true,
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'Mật khẩu cũ của tài khoản',
    required: true,
    example: 'admin',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Mật khẩu mới của tài khoản',
    required: true,
    example: '123123',
  })
  newPassword: string;
}
