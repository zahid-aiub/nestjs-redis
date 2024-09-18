import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class MyRedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(key: string): Promise<any> {
    const newVar: any = await this.redis.get(key);
    return JSON.parse(newVar);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async setJson(key: string, value: any): Promise<void> {
    await this.redis.set(key, JSON.stringify(value));
  }
}
