import { MyRedisService } from './my-redis.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('redis')
export class RedisController {
  constructor(private readonly myRedisService: MyRedisService) {}

  @Post('set')
  async set(
    @Body('key') key: string,
    @Body('value') value: string,
  ): Promise<void> {
    await this.myRedisService.set(key, value);
  }

  @Post('set/json')
  async setJson(
    @Body('key') key: string,
    @Body('value') value: any,
  ): Promise<void> {
    await this.myRedisService.setJson(key, value);
  }

  @Get('get/:key')
  async get(@Param('key') key: string): Promise<any> {
    return await this.myRedisService.get(key);
  }
}
