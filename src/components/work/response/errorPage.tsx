import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { useNodeStyle } from './noneRes';
import { ResponseContext } from './response';
import MyError from '../../common/icon/myError';

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
