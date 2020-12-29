import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Category } from "./category.model";
import { Mark } from "./mark.model";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class Article {
  @ApiProperty({ description: '文章标题' })
  @prop()
  title: string

  @ApiProperty({ description: '文章作者' })
  @prop()
  author: string

  @ApiProperty({ description: '文章封面图' })
  @prop()
  cover: string

  @ApiProperty({ description: '文章内容' })
  @prop()
  body: string

  @ApiProperty({ description: '文章标签' })
  @prop({ itemsRef: 'Mark' })
  marks: Ref<Mark>[]

  @ApiProperty({ description: '所属文章分类' })
  @prop({ itemsRef: 'Category' })
  category: Ref<Category>
}