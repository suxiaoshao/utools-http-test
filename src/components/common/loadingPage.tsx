import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSqlData } from '../../util/store/sqlStore';
import { Backdrop, CircularProgress, Typography } from '@material-ui/core';

const useStyle = makeStyles((theme) =>
  createStyles({
    main: {
      zIndex: theme.zIndex.modal + 1,
      position: 'absolute',
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
    },
    logo: {
      width: '10vh !important',
      height: '10vh !important',
    },
  }),
);

export default function LoadingPage(): JSX.Element {
  const [sqlData] = useSqlData();
  const classes = useStyle();
  return (
    <>
      <Backdrop open={sqlData.loading} className={classes.main}>
        <CircularProgress color="inherit" className={classes.logo} />
        <Typography variant="h6">数据加载中...</Typography>
      </Backdrop>
    </>
  );
}
