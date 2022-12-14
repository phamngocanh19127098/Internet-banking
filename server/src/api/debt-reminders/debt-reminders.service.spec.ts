import { Test, TestingModule } from '@nestjs/testing';
import { DebtRemindersService } from './debt-reminders.service';

describe('DebtRemindersService', () => {
  let service: DebtRemindersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebtRemindersService],
    }).compile();

    service = module.get<DebtRemindersService>(DebtRemindersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
