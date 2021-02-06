import { SqlRunMessage } from '../mapper/sql.interface';
import { sqlWorker } from '../mapper/sql.main';

export interface HttpTagProp {
  httpHttpId: number;
  tagTagId: number;
}

export class HttpTagEntity {
  httpHttpId: number;
  tagTagId: number;

  constructor(httpId: number, tagId: number) {
    this.httpHttpId = httpId;
    this.tagTagId = tagId;
  }

  public static from(httpTagProp: HttpTagProp): HttpTagEntity {
    return new HttpTagEntity(httpTagProp.httpHttpId, httpTagProp.tagTagId);
  }

  public delete(): void {
    const message: SqlRunMessage = {
      code: 2,
      sql: `delete from httpTag where tagTagId=${this.tagTagId} and httpHttpId=${this.tagTagId};`,
    };
    sqlWorker.postMessage(message);
  }

  public save(): void {
    const message: SqlRunMessage = {
      code: 2,
      sql: `insert into httpTag(httpHttpId, tagTagId)
            VALUES (${this.httpHttpId}, ${this.tagTagId});`,
    };
    sqlWorker.postMessage(message);
  }
}
