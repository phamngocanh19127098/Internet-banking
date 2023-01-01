import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestRefreshTokenDto {
  @IsString()
  @ApiProperty({ example: 'refresh token' })
  refreshToken: string;
}
