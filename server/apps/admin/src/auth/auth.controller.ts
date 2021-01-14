import { Adminuser, AdminuserDocument } from '@libs/db/models/adminuser.model';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'apps/server/src/auth/dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator.ts';

@Controller('auth')
@ApiTags('管理员用户')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Adminuser)
    private adminuserModel: ReturnModelType<typeof Adminuser>,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '管理员注册' })
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto;
    const user = await this.adminuserModel.create({
      username,
      password,
    });
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: '管理员登录' })
  @UseGuards(AuthGuard('local-admin'))
  async login(@Body() dto: LoginDto, @CurrentUser() user: AdminuserDocument) {
    return {
      token: this.jwtService.sign(String(user._id)),
    };
  }

  @Get('backuserinfo')
  @ApiOperation({ summary: '获取管理员信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async backuser(@CurrentUser() user: AdminuserDocument) {
    return user;
  }
}
