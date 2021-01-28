import React from 'react';
import { createStyles, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import empty from '../../../assets/emptyResponse.svg';

export const useNodeStyle = makeStyles((theme) =>
  createStyles({
    page: {
      width: `calc(100% - ${theme.spacing(1) * 2}px)`,
      height: `calc(100% - ${theme.spacing(1) * 2}px)`,
      margin: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
    },
    logo: {
      width: '30vh',
      height: '30vh',
    },
  }),
);
export default function NoneRes(): JSX.Element {
  const style = useNodeStyle();
  return (
    <Paper className={style.page}>
      <img className={style.logo} src={empty} alt={''} />
      <Typography variant="h6">还未发送 http 请求</Typography>
    </Paper>
  );
}
