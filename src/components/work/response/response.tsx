import React from 'react';
import { TabPanelDisappear } from '../../common/tabPanel';
import { useReStyle } from '../../../util/hook/useRestyle';
import ResToggle from '../../../components/work/response/resToggle';
import ResHeaders from '../../../components/work/response/resHeaders';
import { HttpContext } from '../workPanel';
import { HttpResponse } from '../../../util/http/httpResponse';
import { NoneFunc, useForceUpdate } from '../../../util/hook/useForceUpdate';
import { Backdrop, Button, createStyles, LinearProgress, makeStyles } from '@material-ui/core';
import ResBody from '../../../components/work/response/resBody/resBody';
import NoneRes from '../../../components/work/response/noneRes';
import ResCookie from '../../../components/work/response/resCookie';
import ErrorPage from '../../../components/work/response/errorPage';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description response 数据的上下文
 * */
export const ResponseContext = React.createContext<{
  /**
   * http 的 response 数据
   * */
  response: HttpResponse;
  /**
   * 更新
   * */
  fatherUpdate: NoneFunc;
}>({
  response: HttpResponse.getNewResponseContent(),
  fatherUpdate() {
    console.log(111);
  },
});

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description response 注入器组件
 * */
function ResponseProvider(props: {
  /**
   * 子组件
   * */
  children: React.ReactNode;
}): JSX.Element {
  const {
    httpManager: { response },
  } = React.useContext(HttpContext);
  const forceUpdate = useForceUpdate();
  return (
    <ResponseContext.Provider value={{ response: response, fatherUpdate: forceUpdate }}>
      {props.children}
    </ResponseContext.Provider>
  );
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 用于包裹 response 部分的组件
 * */
function ResponseFather(props: {
  /**
   * 子组件
   * */
  children: React.ReactNode;
}): JSX.Element {
  const reStyle = useReStyle();
  const {
    httpManager: { isRequest },
  } = React.useContext(HttpContext);
  return (
    <ResponseProvider>
      <TabPanelDisappear className={reStyle.main} index={0} value={Number(isRequest)}>
        {props.children}
      </TabPanelDisappear>
    </ResponseProvider>
  );
}

const useStyle = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      position: 'absolute',
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
    },
    linearProgress: {
      zIndex: theme.zIndex.drawer + 2,
      position: 'absolute',
      right: 0,
      left: 0,
      top: 0,
    },
  }),
);

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description response 组件
 * */
export default function Response(): JSX.Element {
  const reStyle = useReStyle();
  const style = useStyle();
  /**
   * 激活部分标记
   * */
  const [value, setValue] = React.useState<string>('body');
  const {
    httpManager: {
      loading,
      tokenSource,
      response: { contentType },
    },
  } = React.useContext(HttpContext);
  /**
   * 如果 http manager 在 loading,显示 loading 页面
   * */
  if (loading) {
    return (
      <ResponseFather>
        <LinearProgress className={style.linearProgress} />
        <Backdrop className={style.backdrop} open>
          <Button
            color="primary"
            onClick={() => {
              tokenSource?.cancel('提前取消');
            }}
            variant="contained"
          >
            取消
          </Button>
        </Backdrop>
      </ResponseFather>
    );
  }
  switch (contentType) {
    case 'none':
      /**
       * 显示空页面
       * */
      return (
        <ResponseFather>
          <NoneRes />
        </ResponseFather>
      );
    case 'error':
      /**
       * 显示错误页面
       * */
      return (
        <ResponseFather>
          <ErrorPage />
        </ResponseFather>
      );
    default:
      /**
       * 显示成功页面
       * */
      return (
        <ResponseFather>
          <ResToggle
            value={value}
            onchangeValue={(newValue) => {
              setValue(newValue);
            }}
          />
          <TabPanelDisappear index={'body'} value={value} className={reStyle.page}>
            <ResBody />
          </TabPanelDisappear>
          <TabPanelDisappear index={'cookies'} value={value} className={reStyle.page}>
            <ResCookie />
          </TabPanelDisappear>
          <TabPanelDisappear index={'headers'} value={value} className={reStyle.page}>
            <ResHeaders />
          </TabPanelDisappear>
        </ResponseFather>
      );
  }
}
