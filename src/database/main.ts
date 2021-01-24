import { TagEntity } from './entity/tag.entity';
import { CookieEntity } from './entity/cookie.entity';
import { RequestEntity } from './entity/request.entity';
import { HttpEntity } from './entity/http.entity';
import { getDataFile } from '../util/local';

export const connect = window.typeorm.createConnection({
  type: 'sqljs',
  entities: [TagEntity, CookieEntity, RequestEntity, HttpEntity],
  synchronize: true,
  location: getDataFile(),
  autoSave: true,
});
