import React from 'react';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { HttpMapper } from '../../database/mapper/httpMapper';
import { httpArray } from '../../util/store/httpArray';
import { workIndex } from '../../util/store/workIndex';
import { useHistory } from 'react-router-dom';
import SaveHttp from '../common/saveHttp';
import { HttpManager } from '../../util/http/httpManager';

export default function HistoryItem(props: { http: HttpManager; last: boolean; onChange(): void }): JSX.Element {
  const myHistory = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <ListItem>
        <ListItemText
          primary={props.http.name}
          secondary={
            <Typography
              color={'textSecondary'}
              variant={'body2'}
              noWrap
            >{`${props.http.method} ${props.http.url}`}</Typography>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <MenuIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            setOpen(true);
            setAnchorEl(null);
          }}
        >
          修改
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await HttpMapper.deleteHttp(props.http.httpId ?? -1);
            props.onChange();
            setAnchorEl(null);
          }}
        >
          删除
        </MenuItem>
        <MenuItem
          onClick={() => {
            const index = httpArray.addFromHttpManager(props.http);
            workIndex.setData(index);
            myHistory.push({ pathname: '/' });
            setAnchorEl(null);
          }}
        >
          添加至工作区
        </MenuItem>
      </Menu>
      <SaveHttp
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSave={() => {
          props.onChange();
          setOpen(false);
        }}
        httpManager={props.http}
      />
      {props.last ? undefined : <Divider />}
    </>
  );
}
