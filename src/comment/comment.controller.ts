// comment.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';

@Controller('api/comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    findAll(): Promise<Comment[]> {
        return this.commentService.findAll();
    }

    @Post()
    create(@Body() commentData: Comment): Promise<Comment> {
        return this.commentService.create(commentData);
    }
    
    @Post(':parentId/replies')
    createReply(@Param('parentId') parentId: number, @Body() commentData: Comment): Promise<Comment> {
      console.log()
        return this.commentService.createReply(parentId, commentData);
    }
}
