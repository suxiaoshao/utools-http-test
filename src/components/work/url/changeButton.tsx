import React from 'react';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { SwapHoriz } from '@material-ui/icons';
import { HttpContext } from '../workPanel';
import { useUrlStyles } from './urlPaper';

export default function ChangeButton(): JSX.Element {
  const { httpManager, fatherUpdate } = React.useContext(HttpContext);
  const style = useUrlStyles();
  return (
    <Tooltip
      title={<Typography variant={'body2'}>{httpManager.isRequest ? '切换为 response' : '切换为 request'}</Typography>}
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
  );
}
