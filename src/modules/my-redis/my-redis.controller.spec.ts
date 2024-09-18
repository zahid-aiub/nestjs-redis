import { Test, TestingModule } from '@nestjs/testing';
import { MyRedisController } from './my-redis.controller';
import { MyRedisService } from './my-redis.service';

describe('MyRedisController', () => {
  let controller: MyRedisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyRedisController],
      providers: [MyRedisService],
    }).compile();

    controller = module.get<MyRedisController>(MyRedisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
