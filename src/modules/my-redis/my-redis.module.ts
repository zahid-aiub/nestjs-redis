import { Module } from '@nestjs/common';
import { MyRedisService } from './my-redis.service';
import { RedisController } from './my-redis.controller';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [RedisController],
  providers: [MyRedisService],
  exports: [RedisModule, MyRedisService],
})
export class MyRedisModule {}
