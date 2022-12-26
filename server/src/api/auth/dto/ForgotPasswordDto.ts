import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsString()
  @ApiProperty({
    example: 'admin',
  })
  username: string;
}
