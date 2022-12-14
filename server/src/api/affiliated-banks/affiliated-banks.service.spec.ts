import { Test, TestingModule } from '@nestjs/testing';
import { AffiliatedBanksService } from './affiliated-banks.service';

describe('AffiliatedBanksService', () => {
  let service: AffiliatedBanksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AffiliatedBanksService],
    }).compile();

    service = module.get<AffiliatedBanksService>(AffiliatedBanksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
