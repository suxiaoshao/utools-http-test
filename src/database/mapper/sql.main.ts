import SqlWorker from './worker/sql.worker';
import { ReturnMassage, ReturnResultsMessage } from './sql.interface';
import { sqlStore } from '../../utils/store/sqlStore';
import { getDataFile } from '../../utils/update/localPath';
import { Subject } from 'rxjs';

/**
 * 获取 sql worker
 * */
export const sqlWorker = new SqlWorker('');
/**
 * 定义一个接收有返回值的 subject
 * */
export const sqlReturnSubject = new Subject<ReturnResultsMessage>();

/**
 * 监听 worker事件
 * */
sqlWorker.onmessage = (ev: MessageEvent<ReturnMassage>) => {
  switch (ev.data.code) {
    case 1:
      /**
       * 更新 sqlData
       * */
      sqlStore.readData(ev.data.results);
      break;
    case 2:
      /**
       * 将数据库数据保存到文件里
       * */
      window.nodeFs.writeFileSync(getDataFile(), ev.data.data);
      break;
    case 3:
      /**
       * 触发事件
       * */
      sqlReturnSubject.next(ev.data);
      break;
  }
};
