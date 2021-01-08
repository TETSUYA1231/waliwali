import { Mark } from '@libs/db/models/mark.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Mark,
  // routes: {
  //   create: false,
  //   update: false,
  //   delete: false
  // }
})
@Controller('marks')
@ApiTags('分类标签')
export class MarksController {
  constructor(
    @InjectModel(Mark)
    private readonly model: ReturnModelType<typeof Mark>,
  ) {}
}
