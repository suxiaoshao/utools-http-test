import React from 'react';
import { createStyles, Divider, InputBase, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HttpContext } from '../workPanel';
import { httpArray } from '../../../utils/store/httpArray';
import SaveButton from './saveButton';
import SendButton from './sendButton';
import ChangeButton from './changeButton';
import MethodSelector from './methodSelector';

export const useUrlStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
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
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http url 输入栏组件,用于管理 http 方法,链接,发送,切换视图
 * */
export default function UrlPaper(): JSX.Element {
  const style = useUrlStyles();
  const { httpManager } = React.useContext(HttpContext);
  return (
    <Paper component="form" className={style.form}>
      <MethodSelector />
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
      <SendButton />
      <Divider className={style.divider} orientation="vertical" />
      <ChangeButton />
      <SaveButton />
    </Paper>
  );
}
