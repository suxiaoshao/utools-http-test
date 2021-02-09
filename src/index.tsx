import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initDataFromUtoolsDB } from './database/data/initDataFromUtoolsDB';
import { checkVersion } from './util/update/notify';
import 'fontsource-roboto';
import { SqlInitMessage } from './database/mapper/sql.interface';
import { getDataFile } from './util/update/localPath';
import { sqlWorker } from './database/mapper/sql.main';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
if (window.utools === undefined) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
} else {
  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 进入插件时应该做的事: 1. 检查插件版本 2. 初始化数据库
   * */
  window.utools.onPluginReady(() => {
    checkVersion();
    const message: SqlInitMessage = {
      code: 1,
      date: window.nodeFs.readFileSync(getDataFile()),
    };
    sqlWorker.postMessage(message);
    (async () => {
      await initDataFromUtoolsDB();
    })();
  });
}
reportWebVitals();
