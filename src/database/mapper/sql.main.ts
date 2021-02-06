import SqlWorker from './worker/sql.worker';
import { ReturnMassage, ReturnResultsMessage } from './sql.interface';
import { sqlStore } from '../../util/store/sqlStore';
import { getDataFile } from '../../util/update/localPath';
import { Subject } from 'rxjs';

export const sqlWorker = new SqlWorker('');
export const sqlReturnSubject = new Subject<ReturnResultsMessage>();

sqlWorker.onmessage = (ev: MessageEvent<ReturnMassage>) => {
  switch (ev.data.code) {
    case 1:
      sqlStore.readData(ev.data.results);
      break;
    case 2:
      window.nodeFs.writeFileSync(getDataFile(), ev.data.data);
      break;
    case 3:
      sqlReturnSubject.next(ev.data);
      break;
  }
};
