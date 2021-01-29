import React from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  createStyles,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Delete, Edit, Reply } from '@material-ui/icons';
import { HttpMapper } from '../../database/mapper/httpMapper';
import { httpArray } from '../../util/store/httpArray';
import { workIndex } from '../../util/store/workIndex';
import { useHistory } from 'react-router-dom';
import SaveHttp from '../common/httpSave/saveHttp';
import { makeStyles } from '@material-ui/core/styles';
import { brown, green, grey, lightBlue, orange, purple, red } from '@material-ui/core/colors';
import { HttpEntity } from '../../database/entity/http.entity';
import { HttpManager } from '../../util/http/httpManager';

const useStyle = makeStyles((theme) =>
  createStyles({
    DELETE: {
      backgroundColor: red[400],
    },
    POST: {
      backgroundColor: orange[400],
    },
    GET: {
      backgroundColor: green[400],
    },
    PUT: {
      backgroundColor: lightBlue[400],
    },
    HEAD: {
      backgroundColor: grey[400],
    },
    OPTIONS: {
      backgroundColor: brown[400],
    },
    PATCH: {
      backgroundColor: purple[400],
    },
    deleteButton: {
      marginLeft: 'auto',
    },
    card: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    cardHeader: {
      '& .MuiCardHeader-content': {
        maxWidth: `calc(100% - ${56}px)`,
      },
    },
    tag: {
      margin: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
    },
  }),
);

export default function HistoryItem(props: { http: HttpEntity; last: boolean; onChange(): void }): JSX.Element {
  const myHistory = useHistory();
  const style = useStyle();
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <Card className={style.card}>
        <CardHeader
          avatar={
            <Avatar className={style[props.http.method ?? 'GET']}>{(props.http.method ?? 'GET').slice(0, 3)}</Avatar>
          }
          title={props.http.name}
          subheader={`${props.http.url}`}
          subheaderTypographyProps={{ noWrap: true }}
          className={style.cardHeader}
        />
        <CardContent>
          {props.http.tags?.length ? (
            props.http.tags?.map((value) => (
              <Chip color={'primary'} className={style.tag} key={value.tagId} label={value.tagName} />
            ))
          ) : (
            <Typography variant={'body2'} color={'textSecondary'}>
              该 http 请求没有标签
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title={<Typography variant={'body2'}>添加至工作区</Typography>}>
            <IconButton
              onClick={() => {
                const index = httpArray.addFromHttpManager(HttpManager.fromEntity(props.http));
                workIndex.setData(index);
                myHistory.push({ pathname: '/' });
              }}
            >
              <Reply />
            </IconButton>
          </Tooltip>
          <Tooltip title={<Typography variant={'body2'}>修改</Typography>}>
            <IconButton
              onClick={() => {
                setOpen(true);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title={<Typography variant={'body2'}>删除</Typography>}>
            <IconButton
              className={style.deleteButton}
              onClick={async () => {
                await HttpMapper.deleteHttp(props.http.httpId ?? -1);
                props.onChange();
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <SaveHttp
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSave={() => {
          props.onChange();
          setOpen(false);
        }}
        httpManager={HttpManager.fromEntity(props.http)}
      />
    </>
  );
}
