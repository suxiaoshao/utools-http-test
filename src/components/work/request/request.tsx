import React from 'react';
import ReqToggle from './reqToggle';
import Params from './params';
import ReqHeaders from './reqHeaders';
import ReqBody from './reqBody/reqBody';
import { TabPanelDisappear } from '../../common/tabPanel';
import { useReStyle } from '../../../util/hook/useRestyle';
import { HttpContext } from '../workPanel';
import { HttpRequest } from '../../../util/http/httpRequest';
import { NoneFunc, useForceUpdate } from '../../../util/hook/useForceUpdate';

export const RequestContext = React.createContext<{
  request: HttpRequest;
  fatherUpdate: NoneFunc;
}>({
  request: HttpRequest.getNewRequestContent(),
  fatherUpdate() {
    console.log(111);
  },
});

function RequestProvider(props: { children: React.ReactNode }): JSX.Element {
  const {
    httpManager: { request },
  } = React.useContext(HttpContext);
  const forceUpdate = useForceUpdate();
  return (
    <RequestContext.Provider value={{ request: request, fatherUpdate: forceUpdate }}>
      {props.children}
    </RequestContext.Provider>
  );
}

export default function Request(): JSX.Element {
  const style = useReStyle();
  const [value, setValue] = React.useState<string>('params');
  const {
    httpManager: { isRequest },
  } = React.useContext(HttpContext);
  return (
    <RequestProvider>
      <TabPanelDisappear className={style.main} index={1} value={Number(isRequest)}>
        <ReqToggle
          value={value}
          onchangeValue={(newValue) => {
            setValue(newValue);
          }}
        />
        <TabPanelDisappear className={style.page} index={'params'} value={value}>
          <Params />
        </TabPanelDisappear>
        <TabPanelDisappear className={style.page} value={value} index="headers">
          <ReqHeaders />
        </TabPanelDisappear>
        <TabPanelDisappear className={style.page} value={value} index="body">
          <ReqBody />
        </TabPanelDisappear>
      </TabPanelDisappear>
    </RequestProvider>
  );
}
