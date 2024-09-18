import { Test, TestingModule } from '@nestjs/testing';
import { MyRedisService } from './my-redis.service';

describe('MyRedisService', () => {
  let service: MyRedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyRedisService],
    }).compile();

    service = module.get<MyRedisService>(MyRedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
