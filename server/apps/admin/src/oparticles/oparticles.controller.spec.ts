import { Test, TestingModule } from '@nestjs/testing';
import { OparticlesController } from './oparticles.controller';

describe('OparticlesController', () => {
  let controller: OparticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OparticlesController],
    }).compile();

    controller = module.get<OparticlesController>(OparticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
