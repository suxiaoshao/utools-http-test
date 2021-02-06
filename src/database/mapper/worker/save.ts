import { ReturnSaveMessage } from '../sql.interface';
import { Database } from 'sql.js';

export function saveToFile(sqlDataBase: Database, sqlWorker: Worker): void {
  const message: ReturnSaveMessage = {
    code: 2,
    data: sqlDataBase.export(),
  };
  sqlWorker.postMessage(message);
}
