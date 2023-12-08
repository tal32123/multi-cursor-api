// comment.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
    ) {}

    findAll(): Promise<Comment[]> {
        // return this.commentsRepository.find();
        return this.findRootComments();
    }
    findByParent(parentId: number): Promise<Comment[]> {
        return this.commentsRepository.find({
            where: { parent: { id: parentId } },
            // relations: ["replies"] // Optional: if you want to load replies as well
        });
    }
    findRootComments(): Promise<Comment[]> {
        return this.commentsRepository.find({
            where: { parent: IsNull() },
            // relations: ["replies"] // Optional: if you want to load replies as well
        });
    }
    create(commentData: Comment): Promise<Comment> {
        const comment = this.commentsRepository.create(commentData);
        return this.commentsRepository.save(comment);
    }

    async createReply(parentId: number, commentData: Comment): Promise<Comment> {
      const parentComment = await this.commentsRepository.findOne({where: {id: parentId}});
      Logger.debug(commentData, 'createReply', 'commentData');
      Logger.debug(JSON.stringify(parentComment), 'createReply', 'parentComment');

      const reply = this.commentsRepository.create(commentData);
      Logger.debug(reply, 'createReply', 'reply');

      reply.parent = parentComment;
      return this.commentsRepository.save(reply);
  }
}
