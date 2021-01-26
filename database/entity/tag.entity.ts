import { HttpEntity } from './http.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'tagId',
  })
  tagId: number | undefined;
  @Column({
    type: 'text',
    nullable: false,
    name: 'tagName',
  })
  tagName: string | undefined;
  @ManyToMany(() => HttpEntity, (httpEntity) => httpEntity.tags)
  https: HttpEntity[] | undefined;
}
