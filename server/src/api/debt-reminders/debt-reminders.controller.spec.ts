import { Test, TestingModule } from '@nestjs/testing';
import { DebtRemindersController } from './debt-reminders.controller';
import { DebtRemindersService } from './debt-reminders.service';

describe('DebtRemindersController', () => {
  let controller: DebtRemindersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtRemindersController],
      providers: [DebtRemindersService],
    }).compile();

    controller = module.get<DebtRemindersController>(DebtRemindersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
