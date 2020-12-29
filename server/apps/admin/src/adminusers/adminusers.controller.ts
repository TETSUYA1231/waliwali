import { Adminuser } from '@libs/db/models/adminuser.model';
import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Adminuser
})
@Controller('adminusers')
@ApiTags('后台用户')
export class AdminusersController {
  constructor(@InjectModel(Adminuser) private readonly model) { }

  @Get('option')
  option() {
    return {
      title: '管理员账号管理',
      column: [
        { prop: "username", label: "用户名" },
      ],
    }
  }
}
