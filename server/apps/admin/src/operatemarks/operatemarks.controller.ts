import { Operatemark } from '@libs/db/models/operatemark.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Operatemark,
})
@Controller('operatemarks')
@ApiTags('运营侧文章标签')
export class OperatemarksController {
  constructor(
    @InjectModel(Operatemark)
    private readonly model: ReturnModelType<typeof Operatemark>,
  ) {}

  @Get('option')
  option() {
    return {
      title: '分类管理',
      column: [{ prop: 'name', label: '分类名称' }],
    };
  }
}
