import { Test, TestingModule } from '@nestjs/testing';
import { OperatemarksController } from './operatemarks.controller';

describe('OperatemarksController', () => {
  let controller: OperatemarksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperatemarksController],
    }).compile();

    controller = module.get<OperatemarksController>(OperatemarksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
