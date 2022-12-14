import { Test, TestingModule } from '@nestjs/testing';
import { SavedBeneficiarysController } from './saved-beneficiarys.controller';
import { SavedBeneficiarysService } from './saved-beneficiarys.service';

describe('SavedBeneficiarysController', () => {
  let controller: SavedBeneficiarysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedBeneficiarysController],
      providers: [SavedBeneficiarysService],
    }).compile();

    controller = module.get<SavedBeneficiarysController>(SavedBeneficiarysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
