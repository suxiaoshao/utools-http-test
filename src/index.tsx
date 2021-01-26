import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookieMapper } from './database/mapper/cookieMapper';
import { initData } from './database/data/initData';
import { checkVersion } from './util/update/notify';

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
    (async () => {
      await initData();
      await CookieMapper.deleteTimeoutAndSession();
    })();
  });
}
reportWebVitals();
