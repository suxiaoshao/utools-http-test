import React from 'react';
import { CircularProgress, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Close, Send } from '@material-ui/icons';
import { HttpContext } from '../workPanel';
import { useSnackbar } from 'notistack';
import { useUrlStyles } from './urlPaper';

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
            httpManager.loading = true;
            httpManager.isRequest = false;
            fatherUpdate();
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
