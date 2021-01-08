import { Article } from '@libs/db/models/article.model';
import { Category } from '@libs/db/models/category.model';
import { Oparticle } from '@libs/db/models/oparticle.model';
import { Operatemark } from '@libs/db/models/operatemark.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

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

  @Get('option')
  async option() {
    const categories = (
      await this.CategoryModel.find({ name: { $in: ['开发', '运营'] } })
    ).map((v) => ({
      label: v.name,
      value: v._id,
    }));
    const operatemarks = (await this.OperatemarkModel.find()).map((i) => ({
      label: i.name,
      value: i._id,
    }));
    return {
      title: '文章管理',
      searchMenuSpan: 8,
      column: [
        {
          prop: 'title',
          label: '文章标题',
          sortable: true,
          search: true,
          regex: true,
          span: 24,
        },
        {
          prop: 'category',
          label: '文章分类',
          type: 'select',
          dicData: categories,
          span: 12,
        },
        {
          prop: 'operatemark',
          label: '文章标签',
          type: 'select',
          dicData: operatemarks,
          multiple: true,
          span: 12,
        },
        {
          prop: 'cover',
          label: '文章封面图',
          dataType: 'array',
          type: 'upload',
          width: 160,
          listType: 'picture-card',
          propsHttp: {
            res: 'data',
            url: 'url',
          },
          span: 24,
          action: 'upload',
        },
        {
          label: '编辑内容',
          span: 24,
          text: '',
          prop: 'body',
          component: 'ueditor',
          options: {
            action: 'upload',
            customConfig: {
              uploadImgServer: '',
            }, //wangEditor编辑的配置
            // props: {
            //   res: 'data',
            //   url: 'url',
            // },
          },
        },
      ],
    };
  }
}
