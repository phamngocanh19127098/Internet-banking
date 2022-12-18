import { Module } from '@nestjs/common';
import { DebtReminderSocketService } from './debt-reminder-socket.service';
import { DebtReminderSocketGateway } from './debt-reminder-socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtReminder } from 'src/api/debtReminders/entities/debtReminders.entity';
import { DebtRemindersModule } from 'src/api/debtReminders/debtReminders.module';
import { UserModule } from 'src/api/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DebtReminder]), DebtRemindersModule, UserModule],
  providers: [DebtReminderSocketGateway, DebtReminderSocketService],
})
export class DebtReminderSocketModule {}
