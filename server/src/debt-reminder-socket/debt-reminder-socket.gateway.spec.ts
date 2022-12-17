import { Test, TestingModule } from '@nestjs/testing';
import { DebtReminderSocketGateway } from './debt-reminder-socket.gateway';
import { DebtReminderSocketService } from './debt-reminder-socket.service';

describe('DebtReminderSocketGateway', () => {
  let gateway: DebtReminderSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebtReminderSocketGateway, DebtReminderSocketService],
    }).compile();

    gateway = module.get<DebtReminderSocketGateway>(DebtReminderSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
