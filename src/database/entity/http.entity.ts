import { Method } from 'axios';
import { RequestEntity } from './request.entity';
import { TagEntity } from './tag.entity';
import { MyMethod } from '../../util/http/httpManager';

@window.typeorm.Entity('http')
export class HttpEntity {
  @window.typeorm.PrimaryGeneratedColumn({
    name: 'httpId',
  })
  httpId: number | undefined;
  @window.typeorm.Column({
    name: 'url',
    type: 'text',
    nullable: false,
  })
  url: string | undefined;
  @window.typeorm.Column({
    name: 'name',
    type: 'text',
    nullable: false,
  })
  name: string | undefined;
  @window.typeorm.Column({
    name: 'method',
    type: 'varchar',
    nullable: false,
    length: 20,
  })
  method: MyMethod | undefined;
  @window.typeorm.OneToOne(() => RequestEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @window.typeorm.JoinColumn({
    name: 'requestId',
  })
  request: RequestEntity | undefined;
  @window.typeorm.ManyToMany(() => TagEntity, (tagEntity) => tagEntity.https)
  @window.typeorm.JoinTable({
    name: 'httpTag',
  })
  tags: TagEntity[] | undefined;
}
