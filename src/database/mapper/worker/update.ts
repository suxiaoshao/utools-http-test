import { ReturnInitMessage } from '../sql.interface';
import { Database } from 'sql.js';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 根据超时更新数据库和 session 更新数据库
 * */
export function updateByCookieTimeoutAndSession(sqlDataBase: Database): void {
  sqlDataBase.exec(`delete 
       from cookie
       where (maxAge IS NOT NULL and (maxAge * 1000 + cookie.createTime) < ${Date.now()})
          or (expires is not null and expires < '${new Date(
            Date.now(),
          ).toISOString()}' and maxAge is null ) or(maxAge is null and expires is null);`);
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 发送数据库群不数据给主线程
 * */
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

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 删除所有超时的 cookie
 * */
export function updateByCookieTimeout(sqlDataBase: Database): void {
  sqlDataBase.exec(`delete 
       from cookie
       where (maxAge IS NOT NULL and (maxAge * 1000 + cookie.createTime) < ${Date.now()})
          or (expires is not null and expires < '${new Date(Date.now()).toISOString()}' and maxAge is null );`);
}
