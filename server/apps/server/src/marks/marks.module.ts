import { Module } from '@nestjs/common';
import { MarksController } from './marks.controller';

@Module({
  controllers: [MarksController]
})
export class MarksModule {}
