import { Mark } from '@libs/db/models/mark.model';
import { Controller, Get } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Mark
})
@Controller('marks')
export class MarksController {
  constructor(
    @InjectModel(Mark) private readonly model: ReturnModelType<typeof Mark>
  ) { }

  @Get('option')
  option() {
    return {
      title: '标签管理',
      column: [
        { prop: "name", label: "标签名称" }
      ],
    }
  }
}
