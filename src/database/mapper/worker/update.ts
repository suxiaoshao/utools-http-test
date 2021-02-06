import { ReturnInitMessage } from '../sql.interface';
import { Database } from 'sql.js';

export function updateByCookieTimeout(sqlDataBase: Database): void {
  sqlDataBase.exec(`delete 
       from cookie
       where (maxAge IS NOT NULL and (maxAge * 1000 + cookie.createTime) < ${Date.now()})
          or (expires is not null and expires < '${new Date(
            Date.now(),
          ).toISOString()}' and maxAge is null ) or(maxAge is null and expires is null);`);
}

export function updateData(sqlDataBase: Database, sqlWorker: Worker): void {
  sqlDataBase.exec(`delete 
       from cookie
       where (maxAge IS NOT NULL and (maxAge * 1000 + cookie.createTime) < ${Date.now()})
          or (expires is not null and expires < '${new Date(Date.now()).toISOString()}' and maxAge is null );`);
  const results = sqlDataBase.exec(`
      select domain, path, name, value, createTime, maxAge, expires
      from cookie;
      select httpId, url, name, method, requestId
      from http;
      select requestId, bodyChoose, textChoose, text, dataForms, xForms, headers
      from request;
      select tagId, tagName
      from tag;
      select httpHttpId, tagTagId
      from httpTag;`);
  const message: ReturnInitMessage = {
    code: 1,
    results: results,
  };
  sqlWorker.postMessage(message);
}
