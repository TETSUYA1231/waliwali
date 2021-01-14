import { Test, TestingModule } from '@nestjs/testing';
import { ServercatesController } from './servercates.controller';

describe('ServercatesController', () => {
  let controller: ServercatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServercatesController],
    }).compile();

    controller = module.get<ServercatesController>(ServercatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
