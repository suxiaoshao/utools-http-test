@window.typeorm.Entity('cookie')
export class CookieEntity {
  @window.typeorm.PrimaryColumn({
    name: 'domain',
    type: 'text',
  })
  domain: string | undefined;
  @window.typeorm.PrimaryColumn({
    name: 'path',
    type: 'text',
  })
  path: string | undefined;
  @window.typeorm.PrimaryColumn({
    name: 'name',
    type: 'text',
  })
  name: string | undefined;
  @window.typeorm.Column({
    name: 'value',
    type: 'text',
    nullable: false,
  })
  value: string | undefined;
  @window.typeorm.Column({
    name: 'createTime',
    type: 'int',
    nullable: false,
  })
  createTime: number | undefined;
  @window.typeorm.Column({
    name: 'maxAge',
    type: 'int',
    nullable: true,
  })
  maxAge: number | null | undefined;
  @window.typeorm.Column({
    name: 'expires',
    type: 'datetime',
    nullable: true,
  })
  expires: Date | undefined | null;
}
