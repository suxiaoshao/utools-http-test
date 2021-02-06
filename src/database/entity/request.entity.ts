import { RequestBodyChoose, RequestTextChoose } from '../../util/http/httpRequest';
import { SqlRunMessage, SqlRunReturnMessage } from '../mapper/sql.interface';
import { sqlReturnSubject, sqlWorker } from '../mapper/sql.main';
import { readFromQueryResult } from '../mapper/util';

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
    const message: SqlRunMessage = {
      code: 2,
      sql: `delete from request where requestId=${this.requestId}`,
    };
    sqlWorker.postMessage(message);
  }

  public async save(): Promise<void> {
    const thisPromise = new Promise<void>((resolve) => {
      if (this.requestId !== null) {
        // 原先已保存过只要更新
        const message: SqlRunMessage = {
          code: 2,
          sql: `update request set bodyChoose='${this.bodyChoose}',textChoose='${this.textChoose}',text='${this.text}',dataForms='${this.dataForms}',xForms='${this.xForms}',headers='${this.headers}'where requestId=${this.requestId};`,
        };
        sqlWorker.postMessage(message);
        resolve();
      } else {
        //  未保存过的插入并获取最新的 requestId

        // 发送有返回值的 message
        const flag = Math.random();

        // 接收同个标志符的
        const a = sqlReturnSubject.subscribe({
          next: (ev) => {
            if (ev.flag === flag) {
              a.unsubscribe();
              const [{ count }] = readFromQueryResult<{ count: number }>(ev.results[0]);
              this.requestId = count;
              resolve();
            }
          },
        });

        //发送
        const message: SqlRunReturnMessage = {
          code: 3,
          sql: `insert into request(bodyChoose, textChoose, text, dataForms, xForms, headers)
             VALUES ('${this.bodyChoose}', '${this.textChoose}', '${this.text}', '${this.dataForms}', '${this.xForms}', '${this.headers}');
             select max(requestId) as count from request;`,
          flag,
        };
        sqlWorker.postMessage(message);
      }
    });
    await thisPromise;
  }
}
