import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cookie')
export class CookieEntity {
  @PrimaryColumn({
    name: 'domain',
    type: 'text',
  })
  domain: string | undefined;
  @PrimaryColumn({
    name: 'path',
    type: 'text',
  })
  path: string | undefined;
  @PrimaryColumn({
    name: 'name',
    type: 'text',
  })
  name: string | undefined;
  @Column({
    name: 'value',
    type: 'text',
    nullable: false,
  })
  value: string | undefined;
  @Column({
    name: 'createTime',
    type: 'int',
    nullable: false,
  })
  createTime: number | undefined;
  @Column({
    name: 'maxAge',
    type: 'int',
    nullable: true,
  })
  maxAge: number | null | undefined;
  @Column({
    name: 'expires',
    type: 'datetime',
    nullable: true,
  })
  expires: Date | undefined | null;
}
