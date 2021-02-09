import React from 'react';
import UrlPaper from './url/urlPaper';
import { HttpManager } from '../../util/http/httpManager';
import Request from './request/request';
import Response from './response/response';
import { NoneFunc, useForceUpdate } from '../../util/hook/useForceUpdate';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http 管理对象上下文
 * */
export const HttpContext = React.createContext<{
  /**
   * http 请求管理对象
   * */
  httpManager: HttpManager;
  /**
   * 更新主动更新 provider
   * */
  fatherUpdate: NoneFunc;
}>({
  httpManager: HttpManager.getNewHttp(),
  fatherUpdate() {
    console.log(111);
  },
});

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http 管理对象注入器组件
 * */
function HttpProvider(props: {
  /**
   * 子组件
   * */
  children: React.ReactNode;
  /**
   * http 管理对象
   * */
  http: HttpManager;
}): JSX.Element {
  const forceUpdate = useForceUpdate();
  return (
    <HttpContext.Provider value={{ httpManager: props.http, fatherUpdate: forceUpdate }}>
      {props.children}
    </HttpContext.Provider>
  );
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http 工作选项卡
 * */
export default function WorkPanel(props: {
  /**
   * http 管理对象
   * */
  http: HttpManager;
}): JSX.Element {
  return (
    <HttpProvider http={props.http}>
      <UrlPaper />
      <Request />
      <Response />
    </HttpProvider>
  );
}
