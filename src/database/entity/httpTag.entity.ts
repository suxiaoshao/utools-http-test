import { execSql } from '../mapper/util';

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
    execSql(`delete from httpTag where tagTagId=${this.tagTagId} and httpHttpId=${this.tagTagId};`);
  }

  public save(): void {
    execSql(`insert into httpTag(httpHttpId, tagTagId)
            VALUES (${this.httpHttpId}, ${this.tagTagId});`);
  }
}
