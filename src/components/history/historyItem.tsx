import React from 'react';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { HttpEntity } from '../../database/entity/http.entity';
import { Menu as MenuIcon } from '@material-ui/icons';
import { HttpMapper } from '../../database/mapper/httpMapper';
import { httpArray } from '../../util/store/httpArray';
import { workIndex } from '../../util/store/workIndex';
import { useHistory } from 'react-router-dom';

export default function HistoryItem(props: { http: HttpEntity; last: boolean; onChange(): void }): JSX.Element {
  const myHistory = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [name, setName] = React.useState<string | null>(null);
  const update = React.useCallback(async () => {
    props.http.name = name || props.http.name;
    await HttpMapper.saveHttp(props.http);
    setName(null);
    props.onChange();
  }, [name, props]);
  return (
    <>
      <ListItem>
        <ListItemText
          primary={
            name === null ? (
              props.http.name
            ) : (
              <TextField
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                label="新名字"
                onKeyUp={async (event) => {
                  if (event.key === 'Enter') {
                    await update();
                  }
                }}
                onBlur={async () => {
                  await update();
                }}
              />
            )
          }
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
            setName(props.http.name ?? '');
            setAnchorEl(null);
          }}
        >
          重命名
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
            const index = httpArray.addFromHttpEntity(props.http);
            workIndex.setData(index);
            myHistory.push({ pathname: '/' });
            setAnchorEl(null);
          }}
        >
          添加至工作区
        </MenuItem>
      </Menu>
      {props.last ? undefined : <Divider />}
    </>
  );
}
