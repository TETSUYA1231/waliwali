import { Module } from '@nestjs/common';
import { AdminusersController } from './adminusers.controller';

@Module({
  controllers: [AdminusersController]
})
export class AdminusersModule {}
