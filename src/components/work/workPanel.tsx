import React from 'react';
import UrlPaper from './url/urlPaper';
import { HttpManager } from '../../util/http/httpManager';
import Request from './request/request';
import Response from './response/response';
import { NoneFunc, useForceUpdate } from '../../util/hook/useForceUpdate';

export const HttpContext = React.createContext<{
  httpManager: HttpManager;
  fatherUpdate: NoneFunc;
}>({
  httpManager: HttpManager.getNewHttp(),
  fatherUpdate() {
    console.log(111);
  },
});

function HttpProvider(props: { children: React.ReactNode; http: HttpManager }): JSX.Element {
  const forceUpdate = useForceUpdate();
  return (
    <HttpContext.Provider value={{ httpManager: props.http, fatherUpdate: forceUpdate }}>
      {props.children}
    </HttpContext.Provider>
  );
}

export default function WorkPanel(props: { http: HttpManager }): JSX.Element {
  return (
    <HttpProvider http={props.http}>
      <UrlPaper />
      <Request />
      <Response />
    </HttpProvider>
  );
}
