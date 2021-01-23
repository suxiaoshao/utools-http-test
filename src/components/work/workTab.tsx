import React from 'react';
import { createStyles, ListItemIcon, ListItemText, Menu, MenuItem, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HttpManager } from '../../util/http/httpManager';
import { useWorkIndex, workIndex } from '../../util/store/workIndex';
import { httpArray } from '../../util/store/httpArray';
import { Add, Delete } from '@material-ui/icons';

const useStyle = makeStyles(() =>
  createStyles({
    tab: {
      textTransform: 'none',
      maxWidth: '20%',
      '& .MuiTab-wrapper': {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'block',
      },
    },
  }),
);

export default function WorkTab(props: { index: number; httpManager: HttpManager }): JSX.Element {
  const style = useStyle();
  const [, setWorkIndex] = useWorkIndex();
  const [state, setState] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  return (
    <>
      <Tab
        onContextMenu={(event) => {
          event.preventDefault();
          setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          });
        }}
        fullWidth
        className={style.tab}
        label={props.httpManager.name || props.httpManager.url || '空'}
        onClick={() => {
          setWorkIndex(props.index);
        }}
      />
      <Menu
        keepMounted
        open={state !== null}
        onClose={() => {
          setState(null);
        }}
        anchorReference="anchorPosition"
        anchorPosition={state !== null ? { top: state.mouseY, left: state.mouseX } : undefined}
      >
        <MenuItem
          onClick={() => {
            workIndex.setData(httpArray.addHttpManager());
            setState(null);
          }}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>添加新请求</ListItemText>
        </MenuItem>
        {httpArray.isDeleteHttpManager() && (
          <MenuItem
            onClick={() => {
              const httpLength = httpArray.deleteHttpManager(props.index);
              if (httpLength < workIndex.getData()) {
                workIndex.setData(httpLength);
              }
              setState(null);
            }}
          >
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText>删除此请求</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
