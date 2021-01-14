import { Module } from '@nestjs/common';
import { ServercatesController } from './servercates.controller';

@Module({
  controllers: [ServercatesController]
})
export class ServercatesModule {}
