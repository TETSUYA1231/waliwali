import { Module } from '@nestjs/common';
import { OperatemarksController } from './operatemarks.controller';

@Module({
  controllers: [OperatemarksController]
})
export class OperatemarksModule {}
