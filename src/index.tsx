import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initData } from './database/data/initData';
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
  window.utools.onPluginReady(() => {
    checkVersion();
    const message: SqlInitMessage = {
      code: 1,
      date: window.nodeFs.readFileSync(getDataFile()),
    };
    sqlWorker.postMessage(message);
    (async () => {
      await initData();
    })();
  });
}
reportWebVitals();
