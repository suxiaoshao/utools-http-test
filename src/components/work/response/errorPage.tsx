import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { useNodeStyle } from './noneRes';
import { ResponseContext } from './response';
import MyError from '../../common/icon/myError';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 错误页面
 * */
export default function ErrorPage(): JSX.Element {
  const style = useNodeStyle();
  const { response } = React.useContext(ResponseContext);
  return (
    <Paper className={style.page}>
      <MyError className={style.logo} />
      <Typography variant="h6">{response.getCode()}</Typography>
    </Paper>
  );
}
