import { QueryResults } from 'sql.js';
import { SqlRunMessage, SqlRunReturnMessage } from './sql.interface';
import { sqlReturnSubject, sqlWorker } from './sql.main';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 将 QueryResults 转化为对象列表
 * */
export function readFromQueryResult<T>(queryResult: QueryResults | undefined): T[] {
  return (
    queryResult?.values?.map((value) => {
      const result: T = {} as T;
      value.forEach((value1, index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result[queryResult.columns[index]] = value1 ?? null;
      });
      return result;
    }) ?? []
  );
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 发送 sql 语句给 sqlWorker运行,无返回值
 * */
export function execSql(sql: string): void {
  const message: SqlRunMessage = {
    code: 2,
    sql: sql,
  };
  sqlWorker.postMessage(message);
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 发送 sql 语句给 sqlWorker运行,返回数据
 * */
export async function execSqlAndReturn(sql: string): Promise<QueryResults[]> {
  const thisPromise = new Promise<QueryResults[]>((resolve) => {
    const flag = Math.random();
    const a = sqlReturnSubject.subscribe({
      next: (ev) => {
        if (ev.flag === flag) {
          a.unsubscribe();
          resolve(ev.results);
        }
      },
    });
    const message: SqlRunReturnMessage = {
      code: 3,
      sql,
      flag,
    };
    sqlWorker.postMessage(message);
  });
  return await thisPromise;
}
