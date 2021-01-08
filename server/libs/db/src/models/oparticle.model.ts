import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Adminuser } from './adminuser.model';
import { Category } from './category.model';
import { Operatemark } from './operatemark.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
  },
})
export class Oparticle {
  @ApiProperty({ description: '文章标题' })
  @prop()
  title: string;

  @ApiProperty({ description: '文章作者' })
  @prop({ ref: 'Adminuser' })
  author: Ref<Adminuser>;

  @ApiProperty({ description: '文章封面图集' })
  @prop()
  cover: string[];

  @ApiProperty({ description: '文章内容' })
  @prop()
  body: string;

  @ApiProperty({ description: '所属文章分类' })
  @prop({ ref: 'Category' })
  category: Ref<Category>;

  @ApiProperty({ description: '所属运营侧文章标签' })
  @prop({ ref: 'Operatemark' })
  operatemark: Ref<Operatemark>[];
}
