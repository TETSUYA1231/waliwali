import { Module } from '@nestjs/common';
import { OparticlesController } from './oparticles.controller';

@Module({
  controllers: [OparticlesController]
})
export class OparticlesModule {}
