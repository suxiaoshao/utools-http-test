import React from 'react';
import { CircularProgress, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Close, Send } from '@material-ui/icons';
import { HttpContext } from '../workPanel';
import { useSnackbar } from 'notistack';
import { useUrlStyles } from './urlPaper';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 发送 http 请求的按钮
 * */
export default function SendButton(): JSX.Element {
  const { httpManager, fatherUpdate } = React.useContext(HttpContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const style = useUrlStyles();
  return (
    <Tooltip title={<Typography variant={'body2'}>发送请求</Typography>}>
      <div className={style.loadingFather}>
        <IconButton
          className={style.iconButton}
          color="primary"
          onClick={async () => {
            /**
             * 初始化 http 管理对象发送请求需要的状态
             * */
            httpManager.loading = true;
            httpManager.isRequest = false;
            fatherUpdate();

            /**
             * 发送请求,如果放回错误信息则提醒用户
             * */
            const message = await httpManager.httpSend();
            if (message) {
              enqueueSnackbar(message, {
                variant: 'error',
                // eslint-disable-next-line react/display-name
                action: (key) => (
                  <IconButton
                    size="small"
                    onClick={() => {
                      closeSnackbar(key);
                    }}
                  >
                    <Close />
                  </IconButton>
                ),
                autoHideDuration: 2000,
              });
            }
            httpManager.loading = false;
            fatherUpdate();
          }}
        >
          <Send />
        </IconButton>
        {httpManager.loading && <CircularProgress size={41} className={style.loading} />}
      </div>
    </Tooltip>
  );
}
