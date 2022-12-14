import { Test, TestingModule } from '@nestjs/testing';
import { AffiliatedBanksController } from './affiliated-banks.controller';
import { AffiliatedBanksService } from './affiliated-banks.service';

describe('AffiliatedBanksController', () => {
  let controller: AffiliatedBanksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AffiliatedBanksController],
      providers: [AffiliatedBanksService],
    }).compile();

    controller = module.get<AffiliatedBanksController>(AffiliatedBanksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
