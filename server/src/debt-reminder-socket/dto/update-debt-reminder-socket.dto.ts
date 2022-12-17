import { PartialType } from '@nestjs/mapped-types';
import { CreateDebtReminderSocketDto } from './create-debt-reminder-socket.dto';

export class UpdateDebtReminderSocketDto extends PartialType(CreateDebtReminderSocketDto) {
  id: number;
}
