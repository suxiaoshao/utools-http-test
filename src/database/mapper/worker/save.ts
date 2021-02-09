import { ReturnSaveMessage } from '../sql.interface';
import { Database } from 'sql.js';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 发送给主线程数据库字节数据,让主进程保存
 * */
export function saveToFile(sqlDataBase: Database, sqlWorker: Worker): void {
  const message: ReturnSaveMessage = {
    code: 2,
    data: sqlDataBase.export(),
  };
  sqlWorker.postMessage(message);
}
