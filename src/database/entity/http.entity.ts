import { MyMethod } from '../../util/http/httpManager';
import { RequestEntity } from './request.entity';
import { TagEntity } from './tag.entity';
import { SqlRunMessage, SqlRunReturnMessage } from '../mapper/sql.interface';
import { sqlReturnSubject, sqlWorker } from '../mapper/sql.main';
import { sqlStore } from '../../util/store/sqlStore';
import { readFromQueryResult } from '../mapper/util';
import { HttpTagEntity } from './httpTag.entity';

export interface HttpProp {
  httpId: number;
  url: string;
  name: string;
  method: MyMethod;
  requestId: number;
}

export class HttpEntity {
  httpId: number | null;
  url: string;
  name: string;
  method: MyMethod;
  request: RequestEntity;
  tags: TagEntity[];

  constructor(
    httpId: number | null,
    url: string,
    name: string,
    method: MyMethod,
    request: RequestEntity,
    tags: TagEntity[],
  ) {
    this.url = url;
    this.name = name;
    this.method = method;
    this.httpId = httpId;
    this.request = request;
    this.tags = tags;
  }

  public static from(httpProp: HttpProp, request: RequestEntity, tags: TagEntity[]): HttpEntity {
    return new HttpEntity(httpProp.httpId, httpProp.url, httpProp.name, httpProp.method, request, tags);
  }

  public delete(): void {
    sqlStore.deleteHttpTagByHttpId(this.httpId ?? -1);
    const message: SqlRunMessage = {
      code: 2,
      sql: `delete from http where httpId=${this.httpId};`,
    };
    sqlWorker.postMessage(message);
    this.request.delete();
  }

  public async save(): Promise<void> {
    sqlStore.deleteHttpTagByHttpId(this.httpId ?? -1);
    await this.request.save();
    const savePromise = new Promise<void>((resolve) => {
      if (this.httpId !== null) {
        const message: SqlRunMessage = {
          code: 2,
          sql: `update http
                set url='${this.url}',
                    name='${this.name}',
                    method='${this.method}',
                    requestId=${this.request.requestId}
                where httpId = ${this.httpId};`,
        };
        sqlWorker.postMessage(message);
        resolve();
      } else {
        const flag = Math.random();
        const a = sqlReturnSubject.subscribe({
          next: (ev) => {
            if (ev.flag === flag) {
              a.unsubscribe();
              const [{ count }] = readFromQueryResult<{ count: number }>(ev.results[0]);
              this.httpId = count;
              resolve();
            }
          },
        });
        const message: SqlRunReturnMessage = {
          code: 3,
          sql: `insert into http(url, name, method, requestId)
                VALUES ('${this.url}', '${this.name}', '${this.method}', ${this.request.requestId});
          select max(httpId) AS count
          from http;`,
          flag,
        };
        sqlWorker.postMessage(message);
      }
    });
    await savePromise;
    this.tags.map((value) => new HttpTagEntity(this.httpId as number, value.tagId as number));
  }

  public static async saves(httpEntities: HttpEntity[]): Promise<void> {
    for (const httpEntity of httpEntities) {
      await httpEntity.save();
    }
  }
}
