import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
} from '@nestjs/class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone: string;
  name: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  // // @IsNumber()
  accountNumber: string;
}
