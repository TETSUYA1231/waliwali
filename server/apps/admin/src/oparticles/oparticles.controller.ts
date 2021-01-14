import { Article } from '@libs/db/models/article.model';
import { Category } from '@libs/db/models/category.model';
import { Oparticle } from '@libs/db/models/oparticle.model';
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
  model: Oparticle,
})
@Controller('oparticles')
@ApiTags('运营文章')
export class OparticlesController {
  constructor(
    @InjectModel(Oparticle)
    private readonly model: ReturnModelType<typeof Article>,
    @InjectModel(Category)
    private readonly CategoryModel: ReturnModelType<typeof Category>,
    @InjectModel(Operatemark)
    private readonly OperatemarkModel: ReturnModelType<typeof Operatemark>,
  ) {}
}
