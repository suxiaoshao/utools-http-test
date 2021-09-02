import React from 'react';
import { HttpContext } from '../workPanel';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { SaveAlt } from '@material-ui/icons';
import SaveHttp from '../../common/httpSave/saveHttp';
import { httpArray } from '../../../utils/store/httpArray';
import { useUrlStyles } from './urlPaper';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 保存此 http 请求的按钮
 * */
export default function SaveButton(): JSX.Element {
  const [saveHttpOpen, setSaveHttpOpen] = React.useState<boolean>(false);
  const style = useUrlStyles();
  const { httpManager } = React.useContext(HttpContext);
  return (
    <>
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
    </>
  );
}
