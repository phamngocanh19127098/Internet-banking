import { PartialType } from '@nestjs/swagger';
import { CreateDebtReminderDto } from './create-debt-reminder.dto';

export class UpdateDebtReminderDto extends PartialType(CreateDebtReminderDto) {}
