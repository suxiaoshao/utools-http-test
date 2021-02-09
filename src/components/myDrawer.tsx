import React from 'react';
import { createStyles, List, ListItem, ListItemIcon, ListItemText, Theme } from '@material-ui/core';
import { AvTimer, History, MonetizationOn, NetworkCheck } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme: Theme) => {
  const listWidth = 170;
  return createStyles({
    page: {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    myDrawer: {
      flex: `0 0 ${listWidth}px`,
      display: 'flex',
      flexDirection: 'column',
      background: theme.palette.background.paper,
    },
    selected: {
      color: theme.palette.info.light,
      '& > *': {
        color: theme.palette.info.light,
      },
    },
    main: {
      flex: '1 1 0',
      maxWidth: `calc(100vw - ${listWidth}px)`,
    },
  });
});

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏路由按钮的 prop
 * */
export interface MyRouterListItemProp {
  /**
   * 按钮 icon
   * */
  icon: JSX.Element;
  /**
   * 显示的文字
   * */
  text: string;
  /**
   * 按钮指向的路径
   * */
  path: string;
}
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏按钮
 * */
function MyRouterListItem(props: MyRouterListItemProp) {
  const style = useStyle();
  /**
   * 路由信息
   * */
  const myLocation = useLocation();
  /**
   * 跳转
   * */
  const myHistory = useHistory();
  return (
    <ListItem
      onClick={() => {
        myHistory.push(props.path);
      }}
      button
      selected={myLocation.pathname === props.path}
      className={myLocation.pathname === props.path ? style.selected : undefined}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText>{props.text}</ListItemText>
    </ListItem>
  );
}
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏组件的 prop
 * */
interface MyDrawerProps {
  /**
   * 子组件
   * */
  children: React.ReactNode;
  /**
   * 类名
   * */
  className: string;
}
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏组件
 * */
export default function MyDrawer(props: MyDrawerProps): JSX.Element {
  const style = useStyle();
  return (
    <div className={style.page}>
      <List className={style.myDrawer}>
        <MyRouterListItem path="/" icon={<NetworkCheck />} text={'工作区'} />
        <MyRouterListItem icon={<History />} text={'历史记录'} path={'/history'} />
        <MyRouterListItem icon={<AvTimer />} text={'cookies'} path={'/cookies'} />
        <MyRouterListItem icon={<MonetizationOn />} text={'支持作者'} path={'/sponsorship'} />
      </List>
      <main className={`${props.className} ${style.main}`}>{props.children}</main>
    </div>
  );
}
