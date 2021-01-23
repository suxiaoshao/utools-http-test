import { RequestBodyChoose, RequestTextChoose } from '../../util/http/httpRequest';
import { HttpEntity } from './http.entity';

@window.typeorm.Entity('request')
export class RequestEntity {
  @window.typeorm.PrimaryGeneratedColumn({
    name: 'requestId',
  })
  requestId: number | undefined;
  @window.typeorm.Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'bodyChoose',
  })
  bodyChoose: RequestBodyChoose | undefined;
  @window.typeorm.Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'textChoose',
  })
  textChoose: RequestTextChoose | undefined;
  @window.typeorm.Column({
    type: 'text',
    nullable: false,
    name: 'text',
  })
  text: string | undefined;
  @window.typeorm.Column({
    type: 'text',
    nullable: false,
    name: 'dataForms',
  })
  dataForms: string | undefined;
  @window.typeorm.Column({
    type: 'text',
    nullable: false,
    name: 'xForms',
  })
  xForms: string | undefined;
  @window.typeorm.Column({
    type: 'text',
    nullable: false,
    name: 'headers',
  })
  headers: string | undefined;
  @window.typeorm.OneToOne(() => HttpEntity, (httpEntity) => httpEntity.request)
  http: HttpEntity | undefined;
}
