import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './module/database/database.module';
import { UsersModule } from './module/users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
