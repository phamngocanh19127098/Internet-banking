import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { DebtReminderSocketService } from './debt-reminder-socket.service';
import { CreateDebtReminderSocketDto } from './dto/create-debt-reminder-socket.dto';
import { UpdateDebtReminderSocketDto } from './dto/update-debt-reminder-socket.dto';

@WebSocketGateway()
export class DebtReminderSocketGateway {
  constructor(private readonly debtReminderSocketService: DebtReminderSocketService) {}

  @SubscribeMessage('createDebtReminderSocket')
  create(@MessageBody() createDebtReminderSocketDto: CreateDebtReminderSocketDto) {
    return this.debtReminderSocketService.create(createDebtReminderSocketDto);
  }

  @SubscribeMessage('findAllDebtReminderSocket')
  findAll() {
    return this.debtReminderSocketService.findAll();
  }

  @SubscribeMessage('findOneDebtReminderSocket')
  findOne(@MessageBody() id: number) {
    return this.debtReminderSocketService.findOne(id);
  }

  @SubscribeMessage('updateDebtReminderSocket')
  update(@MessageBody() updateDebtReminderSocketDto: UpdateDebtReminderSocketDto) {
    return this.debtReminderSocketService.update(updateDebtReminderSocketDto.id, updateDebtReminderSocketDto);
  }

  @SubscribeMessage('removeDebtReminderSocket')
  remove(@MessageBody() id: number) {
    return this.debtReminderSocketService.remove(id);
  }
}
