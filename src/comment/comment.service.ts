// comment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
    ) {}

    findAll(): Promise<Comment[]> {
        return this.commentsRepository.find();
    }

    create(commentData: Comment): Promise<Comment> {
        const comment = this.commentsRepository.create(commentData);
        return this.commentsRepository.save(comment);
    }

    async createReply(parentId: number, commentData: Comment): Promise<Comment> {
      const parentComment = await this.commentsRepository.findOne({where: {id: parentId}});
      const reply = this.commentsRepository.create(commentData);
      reply.parent = parentComment;
      return this.commentsRepository.save(reply);
  }
}
