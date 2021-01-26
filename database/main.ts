import { TagEntity } from './entity/tag.entity';
import { CookieEntity } from './entity/cookie.entity';
import { RequestEntity } from './entity/request.entity';
import { HttpEntity } from './entity/http.entity';
import { createConnection } from 'typeorm';
import path from 'path';
import fs from 'fs';
// import 'utools-helper/@types/utools';

export function getDataFile(): string {
  const fatherPath = path.resolve(utools.getPath('userData'), 'database');
  if (!fs.existsSync(fatherPath)) {
    fs.mkdirSync(fatherPath);
  }
  const fPath = path.resolve(fatherPath, 'http');
  if (!fs.existsSync(fPath)) {
    fs.mkdirSync(fPath);
  }
  const filePath = path.resolve(fPath, 'http.db');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
  }
  return filePath;
}

export const connect = createConnection({
  type: 'sqljs',
  entities: [TagEntity, CookieEntity, RequestEntity, HttpEntity],
  synchronize: true,
  location: getDataFile(),
  autoSave: true,
});
