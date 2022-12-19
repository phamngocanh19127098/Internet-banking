import { PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './CreateAccountDto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
