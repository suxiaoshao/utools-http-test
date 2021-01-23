import { HttpEntity } from './http.entity';

@window.typeorm.Entity('tag')
export class TagEntity {
  @window.typeorm.PrimaryGeneratedColumn({
    type: 'int',
    name: 'tagId',
  })
  tagId: number | undefined;
  @window.typeorm.Column({
    type: 'text',
    nullable: false,
    name: 'tagName',
  })
  tagName: string | undefined;
  @window.typeorm.ManyToMany(() => HttpEntity, (httpEntity) => httpEntity.tags)
  https: HttpEntity[] | undefined;
}
