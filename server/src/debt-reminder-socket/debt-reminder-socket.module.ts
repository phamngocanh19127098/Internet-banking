import { Module } from '@nestjs/common';
import { DebtReminderSocketService } from './debt-reminder-socket.service';
import { DebtReminderSocketGateway } from './debt-reminder-socket.gateway';

@Module({
  providers: [DebtReminderSocketGateway, DebtReminderSocketService]
})
export class DebtReminderSocketModule {}
