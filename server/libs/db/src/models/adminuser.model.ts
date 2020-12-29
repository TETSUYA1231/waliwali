import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class Adminuser {
  @ApiProperty({description: '用户名', example: 'admin1'})
  @prop()
  username: string

  @ApiProperty({description: '密码', example: 'pass1'})
  @prop()
  password: string
}