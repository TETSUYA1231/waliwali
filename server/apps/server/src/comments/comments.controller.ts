import { Comment } from '@libs/db/models/comment.model';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorator.ts';

@Controller('comments')
export class CommentsController {
  constructor(
    @InjectModel(Comment) private commentModel: ReturnModelType<typeof Comment>,
  ) {}

  @Get()
  async index() {
    return await this.commentModel
      .find()
      .populate('user')
      .sort('-_id')
      .limit(6);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    return await this.commentModel.create(dto);
  }
}
