import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";

export class Mark {
  @ApiProperty({ description: '文章标签' })
  @prop()
  name: string
}