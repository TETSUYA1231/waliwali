import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Category {
  @ApiProperty({ description: '分类名称' })
  @prop()
  name: string
}