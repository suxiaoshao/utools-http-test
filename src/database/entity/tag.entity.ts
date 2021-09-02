import { execSql, execSqlAndReturn, readFromQueryResult } from '../mapper/util';
import { sqlStore } from '../../utils/store/sqlStore';

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

  public async save(): Promise<void> {
    const results = await execSqlAndReturn(
      `insert into tag(tagName) values ('${this.tagName}');select max(tagId) as count from tag;`,
    );
    const [{ count }] = readFromQueryResult<{ count: number }>(results[0]);
    this.tagId = count;
  }

  public update(): void {
    execSql(`update tag set tagName='${this.tagName}' where tagId=${this.tagId};`);
  }

  public delete(): void {
    sqlStore.deleteHttpTagByTagId(this.tagId ?? -1);
    execSql(`delete from tag where tagId=${this.tagId};`);
  }
}
