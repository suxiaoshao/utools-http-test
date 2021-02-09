import React from 'react';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { SwapHoriz } from '@material-ui/icons';
import { HttpContext } from '../workPanel';
import { useUrlStyles } from './urlPaper';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 修改 response/request 页面的按钮
 * */
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
