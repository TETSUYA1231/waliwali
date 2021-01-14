import { Operatemark } from '@libs/db/models/operatemark.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
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
