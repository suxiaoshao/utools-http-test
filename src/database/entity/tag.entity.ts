import { SqlRunMessage } from '../mapper/sql.interface';
import { sqlWorker } from '../mapper/sql.main';
import { sqlStore } from '../../util/store/sqlStore';

export interface TagProp {
  tagId: number;
  tagName: string;
}

export class TagEntity {
  public tagId: number | null;
  public tagName: string;

  public constructor(tagId: number | null, tagName: string) {
    this.tagId = tagId;
    this.tagName = tagName;
  }

  public static from(tagProp: TagProp): TagEntity {
    return new TagEntity(tagProp.tagId, tagProp.tagName);
  }

  public save(): void {
    const message: SqlRunMessage = {
      code: 2,
      sql: `insert into tag(tagName) values ('${this.tagName}')`,
    };
    sqlWorker.postMessage(message);
  }

  public update(): void {
    const message: SqlRunMessage = {
      code: 2,
      sql: `update tag set tagName='${this.tagName}' where tagId=${this.tagId};`,
    };
    sqlWorker.postMessage(message);
  }

  public delete(): void {
    sqlStore.deleteHttpTagByTagId(this.tagId ?? -1);
    const message: SqlRunMessage = {
      code: 2,
      sql: `delete from tag where tagId=${this.tagId};`,
    };
    sqlWorker.postMessage(message);
  }
}
