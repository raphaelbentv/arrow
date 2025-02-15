import { Test, TestingModule } from '@nestjs/testing';
import { NomDuServiceService } from './nom-du-service.service';

describe('NomDuServiceService', () => {
  let service: NomDuServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomDuServiceService],
    }).compile();

    service = module.get<NomDuServiceService>(NomDuServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
