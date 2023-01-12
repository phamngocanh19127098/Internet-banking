import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class BankIdDto {
  @ApiProperty({
    description: 'id của bank',
    example: null,
  })
  @Allow()
  bankId: number;
}
