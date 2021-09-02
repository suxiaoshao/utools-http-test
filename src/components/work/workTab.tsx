import React from 'react';
import { createStyles, ListItemIcon, ListItemText, Menu, MenuItem, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HttpManager } from '../../utils/http/httpManager';
import { useWorkIndex, workIndex } from '../../utils/store/workIndex';
import { httpArray } from '../../utils/store/httpArray';
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

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description workTab 的 prop
 * */
export interface WorkTabProp {
  /**
   * 这个 tab 指向的 http 请求在 httpArray 中的下标
   * */
  index: number;
  /**
   * 这个 tab 的http 请求
   * */
  httpManager: HttpManager;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description work 组件的 tab,封装了右键点击
 * */
export default function WorkTab(props: WorkTabProp): JSX.Element {
  const style = useStyle();
  /**
   * 设置激活的 http 请求的下标
   * */
  const [, setWorkIndex] = useWorkIndex();
  /**
   * menu 出现的位置, 为 null 则不显示
   * */
  const [menuPosition, setMenuPosition] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  return (
    <>
      <Tab
        onContextMenu={(event) => {
          event.preventDefault();
          setMenuPosition({
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
        open={menuPosition !== null}
        onClose={() => {
          setMenuPosition(null);
        }}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition !== null ? { top: menuPosition.mouseY, left: menuPosition.mouseX } : undefined}
      >
        <MenuItem
          onClick={() => {
            workIndex.setData(httpArray.addHttpManager());
            setMenuPosition(null);
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
              setMenuPosition(null);
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
