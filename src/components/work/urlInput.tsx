import React from 'react';
import MySelector from '../common/mySelector';
import {
  CircularProgress,
  createStyles,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SaveAlt, Send, SwapHoriz } from '@material-ui/icons';
import { Method } from 'axios';
import { useForceUpdate } from '../../util/hook/useForceUpdate';
import { HttpContext } from './workPanel';
import SaveHttp from '../common/saveHttp';
import { httpArray } from '../../util/store/httpArray';

const httpMethod: { text: string; value: Method }[] = ([
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'OPTIONS',
  'PATCH',
] as const).map((value: Method) => {
  return {
    text: value,
    value: value,
  };
});

export const useUrlStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 'calc(100% - 16px)',
      margin: '2px 8px',
      flex: '0 0 auto',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    speedDial: {
      position: 'fixed',
      right: theme.spacing(2),
      top: theme.spacing(11),
      zIndex: 100,
    },
    loadingFather: {
      position: 'relative',
    },
    loading: {
      color: theme.palette.primary.main,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
  }),
);

export default function UrlInput(): JSX.Element {
  const style = useUrlStyles();
  const [saveHttpOpen, setSaveHttpOpen] = React.useState<boolean>(false);
  const forceUpdate = useForceUpdate();
  const { httpManager, fatherUpdate } = React.useContext(HttpContext);
  return (
    <Paper component="form" className={style.root}>
      <MySelector<Method>
        value={httpManager.method}
        onValueChange={(newValue) => {
          httpManager.method = newValue;
          forceUpdate();
        }}
        itemList={httpMethod}
        className={style.iconButton}
      />
      <Divider className={style.divider} orientation="vertical" />
      <InputBase
        placeholder="url"
        className={style.input}
        value={httpManager.url}
        onChange={(event) => {
          httpManager.url = event.target.value;
          httpArray.update();
        }}
      />
      <Tooltip title={<Typography variant={'body2'}>发送请求</Typography>}>
        <div className={style.loadingFather}>
          <IconButton
            className={style.iconButton}
            color="primary"
            onClick={() => {
              httpManager.loading = true;
              httpManager.isRequest = false;
              fatherUpdate();
              httpManager.httpSend().then(() => {
                httpManager.loading = false;
                fatherUpdate();
              });
            }}
          >
            <Send />
          </IconButton>
          {httpManager.loading && <CircularProgress size={41} className={style.loading} />}
        </div>
      </Tooltip>
      <Divider className={style.divider} orientation="vertical" />
      <Tooltip
        title={
          <Typography variant={'body2'}>{httpManager.isRequest ? '切换为 response' : '切换为 request'}</Typography>
        }
      >
        <IconButton
          className={style.iconButton}
          onClick={() => {
            httpManager.isRequest = !httpManager.isRequest;
            fatherUpdate();
          }}
        >
          <SwapHoriz />
        </IconButton>
      </Tooltip>
      <Tooltip title={<Typography variant="body2">保存此请求</Typography>}>
        <IconButton
          className={style.iconButton}
          onClick={() => {
            setSaveHttpOpen(true);
          }}
        >
          <SaveAlt />
        </IconButton>
      </Tooltip>
      <SaveHttp
        open={saveHttpOpen}
        onClose={() => {
          setSaveHttpOpen(false);
        }}
        onSave={(newHttpEntity) => {
          httpManager.changeFormHttpEntity(newHttpEntity);
          setSaveHttpOpen(false);
          httpArray.update();
        }}
        httpManager={httpManager}
      />
    </Paper>
  );
}
