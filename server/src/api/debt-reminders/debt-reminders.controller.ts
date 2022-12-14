import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DebtRemindersService } from './debt-reminders.service';
import { CreateDebtReminderDto } from './dto/create-debt-reminder.dto';
import { UpdateDebtReminderDto } from './dto/update-debt-reminder.dto';

@Controller('debt-reminders')
export class DebtRemindersController {
  constructor(private readonly debtRemindersService: DebtRemindersService) {}

  @Post()
  create(@Body() createDebtReminderDto: CreateDebtReminderDto) {
    return this.debtRemindersService.create(createDebtReminderDto);
  }

  @Get()
  findAll() {
    return this.debtRemindersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtRemindersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebtReminderDto: UpdateDebtReminderDto) {
    return this.debtRemindersService.update(+id, updateDebtReminderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtRemindersService.remove(+id);
  }
}
