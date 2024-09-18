import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MyRedisModule } from './modules/my-redis/my-redis.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, MyRedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
