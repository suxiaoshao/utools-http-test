import { RequestEntity } from './request.entity';
import { TagEntity } from './tag.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MyMethod } from '../../src/util/http/httpManager';

@Entity('http')
export class HttpEntity {
  @PrimaryGeneratedColumn({
    name: 'httpId',
  })
  httpId: number | undefined;
  @Column({
    name: 'url',
    type: 'text',
    nullable: false,
  })
  url: string | undefined;
  @Column({
    name: 'name',
    type: 'text',
    nullable: false,
  })
  name: string | undefined;
  @Column({
    name: 'method',
    type: 'varchar',
    nullable: false,
    length: 20,
  })
  method: MyMethod | undefined;
  @OneToOne(() => RequestEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'requestId',
  })
  request: RequestEntity | undefined;
  @ManyToMany(() => TagEntity, (tagEntity) => tagEntity.https)
  @JoinTable({
    name: 'httpTag',
  })
  tags: TagEntity[] | undefined;
}
