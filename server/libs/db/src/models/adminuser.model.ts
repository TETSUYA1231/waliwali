import { ApiProperty } from '@nestjs/swagger';
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';

export type AdminuserDocument = DocumentType<Adminuser>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Adminuser {
  @ApiProperty({ description: '用户名', example: 'admin1' })
  @prop()
  username: string;

  @ApiProperty({ description: '密码', example: 'pass1' })
  @prop({
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;
}
