import React from 'react';
import { createStyles, Drawer, List, ListItem, ListItemIcon, ListItemText, Theme } from '@material-ui/core';
import { AvTimer, History, MonetizationOn, NetworkCheck } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme: Theme) => {
  const listWidth = 144.538;
  return createStyles({
    page: {
      display: 'flex',
      width: '100%',
      height: '100%',
      '& > main': {
        flex: '1 1 0',
      },
    },
    myDrawer: {
      flex: `0 0 ${listWidth}px`,
      display: 'flex',
      flexDirection: 'column',
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

interface MyDrawerProps {
  children: React.ReactNode;
  className: string;
}

function MyRouterList(props: { icon: JSX.Element; text: string; path: string }) {
  const style = useStyle();
  const myLocation = useLocation();
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

export default function MyDrawer(props: MyDrawerProps): JSX.Element {
  const style = useStyle();
  return (
    <div className={style.page}>
      <Drawer open className={style.myDrawer} variant="persistent">
        <List component="nav">
          <MyRouterList path="/" icon={<NetworkCheck />} text={'工作区'} />
          <MyRouterList icon={<History />} text={'历史记录'} path={'/history'} />
          <MyRouterList icon={<AvTimer />} text={'cookies'} path={'/cookies'} />
          <MyRouterList icon={<MonetizationOn />} text={'支持'} path={'/sponsorship'} />
        </List>
      </Drawer>
      <main className={`${props.className} ${style.main}`}>{props.children}</main>
    </div>
  );
}