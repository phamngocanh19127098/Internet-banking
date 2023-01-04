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
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
    description: 'Tạo nhắc nợ thành công. Customer mới dùng được.',
  })
  @Roles(Role.CUSTOMER)
  async create(@Body() createDebtReminderDto: CreateDebtReminderDto) {
    const data = await this.debtRemindersService.create(createDebtReminderDto);

    return {
      statusCode: 201,
      message: 'Tạo nhắc nợ thành công',
    };
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

  @ApiOperation({
    description:
      'Lấy danh sách nợ được tạo do bản thân tạo. Customer mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Lấy thông tin danh sách nợ do bản thân tạo thành công',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không được dùng tính năng này',
  })
  @ApiUnauthorizedResponse({ description: 'Không có quyền dùng tính năng này' })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy danh sách nợ được tạo do bản thân tạo',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Get('/list/created/:userId')
  async getAllDebtReminderCreated(@Param('userId') userId: string) {
    const result = await this.debtRemindersService.getDebtReminderCreated(
      +userId,
    );
    return {
      statusCode: 200,
      data: result,
      message: 'Lấy thông tin danh sách nợ do bản thân tạo thành công',
    };
  }

  @ApiOperation({
    description:
      'Lấy danh sách nợ được tạo do người khác gửi. Customer mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Lấy thông tin danh sách nợ do người khác gửi thành công',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không được dùng tính năng này',
  })
  @ApiUnauthorizedResponse({ description: 'Không có quyền dùng tính năng này' })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy danh sách nợ được tạo do người khác gửi',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Get('/list/received/:userId')
  async getAllDebtReminderReceived(@Param('userId') userId: string) {
    const result = await this.debtRemindersService.getDebtReminderReceived(
      +userId,
    );
    return {
      statusCode: 200,
      data: result,
      message: 'Lấy thông tin danh sách nợ do người khác gửi thành công',
    };
  }

  @ApiOperation({
    description:
      'Lấy thông tin danh sách nợ chưa thanh toán. Customer mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Lấy thông tin danh sách nợ chưa thanh toán thành công',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không được dùng tính năng này',
  })
  @ApiUnauthorizedResponse({ description: 'Không có quyền dùng tính năng này' })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy thông tin danh sách nợ chưa thanh toán',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Get('/list/unpaid/:userId')
  async getUnPaidDebt(@Param('userId') userId: string) {
    const result = await this.debtRemindersService.getUnPaidDebtReminder(
      +userId,
    );
    return {
      statusCode: 200,
      data: result,
      message: 'Lấy thông tin danh sách nợ chưa thanh toán thành công',
    };
  }

  @ApiOperation({ description: 'Thanh toán nhắc nợ. Customer mới dùng được.' })
  @ApiOkResponse({
    description: 'Tạo giao dịch chuyển khoản thành công.',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không được dùng tính năng này',
  })
  @ApiUnauthorizedResponse({ description: 'Không có quyền dùng tính năng này' })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi thanh toán nhắc nợ',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Post('/pay')
  async liquidateDebtReminder(
    @User() user,
    @Body() payDebtReminderDto: PayDebtReminderDto,
    @Headers('authorization') authorization: string,
  ) {
    return this.debtRemindersService.payDebtReminder(
      payDebtReminderDto,
      authorization,
    );
  }
}
