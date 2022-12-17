import { Test, TestingModule } from '@nestjs/testing';
import { DebtReminderSocketService } from './debt-reminder-socket.service';

describe('DebtReminderSocketService', () => {
  let service: DebtReminderSocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebtReminderSocketService],
    }).compile();

    service = module.get<DebtReminderSocketService>(DebtReminderSocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
