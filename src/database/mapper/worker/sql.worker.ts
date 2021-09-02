import { ReturnResultsMessage, SqlMessage } from '../sql.interface';
import sql, { Database } from 'sql.js';
import { updateByCookieTimeout, updateByCookieTimeoutAndSession, updateData } from './update';
import { saveToFile } from './save';
import { initDatabaseTable } from './initDatabaseTable';

const sqlWorker = self as unknown as Worker;
let sqlDataBase: Database;
sqlWorker.onmessage = (ev: MessageEvent<SqlMessage>) => {
  switch (ev.data.code) {
    case 1:
      /**
       * 创建数据库,初始化数据库表,删除超时和 session 的 cookie
       * */
      sqlDataBase = new sql.Database(ev.data.date);
      initDatabaseTable(sqlDataBase);
      updateByCookieTimeoutAndSession(sqlDataBase);
      break;
    case 2:
      /**
       * 执行 sql 语句
       * */
      sqlDataBase.exec(ev.data.sql);
      break;
    case 3:
      /**
       * 执行 sql 语句并返回数据
       * */
      const results = sqlDataBase.exec(ev.data.sql);
      const message: ReturnResultsMessage = {
        code: 3,
        flag: ev.data.flag,
        results,
      };
      sqlWorker.postMessage(message);
      break;
  }
  updateByCookieTimeout(sqlDataBase);
  updateData(sqlDataBase, sqlWorker);
  saveToFile(sqlDataBase, sqlWorker);
};

export default null as unknown as typeof Worker;
