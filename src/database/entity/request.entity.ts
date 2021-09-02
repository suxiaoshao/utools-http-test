import { RequestBodyChoose, RequestTextChoose } from '../../utils/http/httpRequest';
import { execSql, execSqlAndReturn, readFromQueryResult } from '../mapper/util';

export interface RequestProp {
  requestId: number;
  bodyChoose: RequestBodyChoose;
  textChoose: RequestTextChoose;
  text: string;
  dataForms: string;
  xForms: string;
  headers: string;
}

export class RequestEntity {
  requestId: number | null;
  bodyChoose: RequestBodyChoose;
  textChoose: RequestTextChoose;
  text: string;
  dataForms: string;
  xForms: string;
  headers: string;

  constructor(
    requestId: number | null,
    bodyChoose: RequestBodyChoose,
    textChoose: RequestTextChoose,
    text: string,
    dataForms: string,
    xForms: string,
    headers: string,
  ) {
    this.requestId = requestId;
    this.text = text;
    this.bodyChoose = bodyChoose;
    this.textChoose = textChoose;
    this.dataForms = dataForms;
    this.xForms = xForms;
    this.headers = headers;
  }

  public static from(requestProp: RequestProp): RequestEntity {
    return new RequestEntity(
      requestProp.requestId,
      requestProp.bodyChoose,
      requestProp.textChoose,
      requestProp.text,
      requestProp.dataForms,
      requestProp.xForms,
      requestProp.headers,
    );
  }

  public delete(): void {
    execSql(`delete from request where requestId=${this.requestId}`);
  }

  public async save(): Promise<void> {
    if (this.requestId !== null) {
      // 原先已保存过只要更新
      execSql(
        `update request set bodyChoose='${this.bodyChoose}',textChoose='${this.textChoose}',text='${this.text}',dataForms='${this.dataForms}',xForms='${this.xForms}',headers='${this.headers}'where requestId=${this.requestId};`,
      );
    } else {
      const results =
        await execSqlAndReturn(`insert into request(bodyChoose, textChoose, text, dataForms, xForms, headers)
             VALUES ('${this.bodyChoose}', '${this.textChoose}', '${this.text}', '${this.dataForms}', '${this.xForms}', '${this.headers}');
             select max(requestId) as count from request;`);
      const [{ count }] = readFromQueryResult<{ count: number }>(results[0]);
      this.requestId = count;
    }
  }
}
