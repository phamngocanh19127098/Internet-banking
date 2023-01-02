import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/commons/decorator/roles.decorator';
import { Role } from '../users/entity/user.entity';
import { DebtRemindersService } from './debtReminders.service';
import { CreateDebtReminderDto } from './dto/create-debt-reminder.dto';
import { UpdateDebtReminderDto } from './dto/update-debt-reminder.dto';
import { User } from '../../commons/decorator/user.decorator';
import { PayDebtReminderDto } from '../transactions/dto/pay-debt-reminder.dto';

@Controller('debtReminder')
@ApiTags('debtReminder')
export class DebtRemindersController {
  constructor(private readonly debtRemindersService: DebtRemindersService) {}

  @Post()
  @ApiOkResponse({
    description: 'Tạo nhắc nợ thành công',
  })
  @Roles(Role.CUSTOMER)
  async create(@Body() createDebtReminderDto: CreateDebtReminderDto) {
    let data = await this.debtRemindersService.create(createDebtReminderDto);

    return {
      statusCode: 201,
      message: 'Tạo nhắc nợ thành công',
    };
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
  update(
    @Param('id') id: string,
    @Body() updateDebtReminderDto: UpdateDebtReminderDto,
  ) {
    return this.debtRemindersService.update(+id, updateDebtReminderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtRemindersService.remove(+id);
  }

  @Get('/list/created/:userId')
  @Roles(Role.CUSTOMER)
  @ApiOkResponse({
    description: 'Lấy thông tin danh sách nợ do bản thân tạo thành công',
  })
  @ApiOperation({ description: 'Lấy danh sách nợ được tạo do bản thân tạo' })
  async getAllDebtReminderCreated(@Param('userId') userId: string) {
    let result = await this.debtRemindersService.getDebtReminderCreated(
      +userId,
    );
    return {
      statusCode: 200,
      data: result,
      message: 'Lấy thông tin danh sách nợ do bản thân tạo thành công',
    };
  }

  @Get('/list/received/:userId')
  @Roles(Role.CUSTOMER)
  @ApiOkResponse({
    description: 'Lấy thông tin danh sách nợ do người khác gửi thành công',
  })
  @ApiOperation({ description: 'Lấy danh sách nợ được tạo do người khác gửi' })
  async getAllDebtReminderReceived(@Param('userId') userId: string) {
    let result = await this.debtRemindersService.getDebtReminderReceived(
      +userId,
    );
    return {
      statusCode: 200,
      data: result,
      message: 'Lấy thông tin danh sách nợ do người khác gửi thành công',
    };
  }

  @ApiOkResponse({
    description: 'Lấy thông tin danh sách nợ chưa thanh toán thành công',
  })
  @Roles(Role.CUSTOMER)
  @ApiOperation({ description: 'Lấy thông tin danh sách nợ chưa thanh toán' })
  @Get('/list/unpaid/:userId')
  async getUnPaidDebt(@Param('userId') userId: string) {
    let result = await this.debtRemindersService.getUnPaidDebtReminder(+userId);
    return {
      statusCode: 200,
      data: result,
      message: 'Lấy thông tin danh sách nợ chưa thanh toán thành công',
    };
  }

  @Roles(Role.CUSTOMER)
  @Post('/pay')
  async liquidateDebtReminder(
    @User() user,
    @Body() payDebtReminderDto: PayDebtReminderDto,
    @Headers('authorization') authorization: string,
  ) {
    return this.debtRemindersService.payDebtReminder(
      user,
      payDebtReminderDto,
      authorization,
    );
  }
}
