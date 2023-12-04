// comment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'double precision', nullable: true })
    x: number| null;

    @Column({ type: 'double precision', nullable: true })
    y: number| null;

    @Column()
    comment: string;

    @ManyToOne(() => Comment, comment => comment.replies)
    @JoinColumn({ name: 'parentId' })
    parent: Comment;

    @OneToMany(() => Comment, comment => comment.parent)
    replies: Comment[];
}
