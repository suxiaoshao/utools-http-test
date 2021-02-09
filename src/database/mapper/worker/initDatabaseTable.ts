import { Database } from 'sql.js';
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 数据库建表
 * */
export function initDatabaseTable(sqlDataBase: Database): void {
  const sql = `create table if not exists cookie
               (
                   domain     text,
                   path       text,
                   name       text,
                   value      text    not null,
                   createTime integer not null,
                   maxAge     integer,
                   expires    datetime,
                   primary key (domain, path, name)
               );
  create table if not exists request
  (
      requestId  integer primary key autoincrement,
      bodyChoose varchar(50) not null,
      textChoose varchar(50) not null,
      \`text\`   text        not null,
      dataForms  text        not null,
      xForms     text        not null,
      headers    text        not null
  );

  create table if not exists http
  (
      httpId    integer primary key autoincrement,
      url       text    not null,
      name      text    not null,
      method    text    not null,
      requestId integer not null,
      foreign key (requestId) references request (requestId)
  );
  create table if not exists tag
  (
      tagId   integer primary key autoincrement,
      tagName text not null
  );
  create table if not exists httpTag
  (
      httpHttpId integer,
      tagTagId   integer,
      primary key (httpHttpId, tagTagId),
      foreign key (httpHttpId) references http (httpId),
      foreign key (tagTagId) references tag (tagId)
  );`;
  sqlDataBase.exec(sql);
}
