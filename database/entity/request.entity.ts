import { RequestBodyChoose, RequestTextChoose } from '../../src/util/http/httpRequest';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('request')
export class RequestEntity {
  @PrimaryGeneratedColumn({
    name: 'requestId',
  })
  requestId: number | undefined;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'bodyChoose',
  })
  bodyChoose: RequestBodyChoose | undefined;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'textChoose',
  })
  textChoose: RequestTextChoose | undefined;
  @Column({
    type: 'text',
    nullable: false,
    name: 'text',
  })
  text: string | undefined;
  @Column({
    type: 'text',
    nullable: false,
    name: 'dataForms',
  })
  dataForms: string | undefined;
  @Column({
    type: 'text',
    nullable: false,
    name: 'xForms',
  })
  xForms: string | undefined;
  @Column({
    type: 'text',
    nullable: false,
    name: 'headers',
  })
  headers: string | undefined;
}
