import { ReturnResultsMessage, SqlMessage } from '../sql.interface';
import sql, { Database } from 'sql.js';
import { updateByCookieTimeout, updateData } from './update';
import { saveToFile } from './save';
import { initDatabase } from './initDatabase';

const sqlWorker = (self as unknown) as Worker;
let sqlDataBase: Database;
sqlWorker.onmessage = (ev: MessageEvent<SqlMessage>) => {
  switch (ev.data.code) {
    case 1:
      sqlDataBase = new sql.Database(ev.data.date);
      initDatabase(sqlDataBase);
      updateByCookieTimeout(sqlDataBase);
      break;
    case 2:
      sqlDataBase.exec(ev.data.sql);
      break;
    case 3:
      const results = sqlDataBase.exec(ev.data.sql);
      const message: ReturnResultsMessage = {
        code: 3,
        flag: ev.data.flag,
        results,
      };
      sqlWorker.postMessage(message);
      break;
  }
  updateData(sqlDataBase, sqlWorker);
  saveToFile(sqlDataBase, sqlWorker);
};

export default (null as unknown) as typeof Worker;
