import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StorageModule } from './storage/storage.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
