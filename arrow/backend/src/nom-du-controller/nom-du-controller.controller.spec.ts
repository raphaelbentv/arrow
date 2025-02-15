import { Test, TestingModule } from '@nestjs/testing';
import { NomDuControllerController } from './nom-du-controller.controller';

describe('NomDuControllerController', () => {
  let controller: NomDuControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomDuControllerController],
    }).compile();

    controller = module.get<NomDuControllerController>(NomDuControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
