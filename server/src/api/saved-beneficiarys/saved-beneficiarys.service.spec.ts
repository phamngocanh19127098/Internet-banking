import { Test, TestingModule } from '@nestjs/testing';
import { SavedBeneficiarysService } from './saved-beneficiarys.service';

describe('SavedBeneficiarysService', () => {
  let service: SavedBeneficiarysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedBeneficiarysService],
    }).compile();

    service = module.get<SavedBeneficiarysService>(SavedBeneficiarysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
