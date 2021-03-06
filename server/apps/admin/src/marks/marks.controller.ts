import { Mark } from '@libs/db/models/mark.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Crud({
  model: Mark,
})
@Controller('marks')
@ApiTags('标签')
export class MarksController {
  constructor(
    @InjectModel(Mark) private readonly model: ReturnModelType<typeof Mark>,
  ) {}
}
