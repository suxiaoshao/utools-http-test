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
import { httpArray } from '../../utils/store/httpArray';
import { workIndex } from '../../utils/store/workIndex';
import { useHistory } from 'react-router-dom';
import SaveHttp from '../common/httpSave/saveHttp';
import { makeStyles } from '@material-ui/core/styles';
import { brown, green, grey, lightBlue, orange, purple, red } from '@material-ui/core/colors';
import { HttpManager } from '../../utils/http/httpManager';
import { HttpEntity } from '../../database/entity/http.entity';

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

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 每个历史组件的 prop
 * */
export interface HistoryItemProp {
  /**
   * 要显示的历史数据库数据
   * */
  http: HttpEntity;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 二秘阁历史记录的组件
 * */
export default function HistoryItem(props: HistoryItemProp): JSX.Element {
  /**
   * react-dom-router 的跳转函数
   * */
  const myHistory = useHistory();
  const style = useStyle();
  /**
   * 是否打开修改页面
   * */
  const [modifyOpen, setModifyOpen] = React.useState<boolean>(false);
  return (
    <>
      <Card className={style.card}>
        <CardHeader
          avatar={
            /**
             * 显示 http 方法
             * */
            <Avatar className={style[props.http.method ?? 'GET']}>{(props.http.method ?? 'GET').slice(0, 3)}</Avatar>
          }
          /** http 保存名 */
          title={props.http.name}
          /** url */
          subheader={`${props.http.url}`}
          subheaderTypographyProps={{ noWrap: true }}
          className={style.cardHeader}
        />
        {/* http 保存的标签 */}
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
          {/* 添加至工作区 */}
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
          {/* 打开修改窗口 */}
          <Tooltip title={<Typography variant={'body2'}>修改</Typography>}>
            <IconButton
              onClick={() => {
                setModifyOpen(true);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          {/* 删除该 http历史 */}
          <Tooltip title={<Typography variant={'body2'}>删除</Typography>}>
            <IconButton
              className={style.deleteButton}
              onClick={async () => {
                props.http.delete();
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <SaveHttp
        open={modifyOpen}
        onClose={() => {
          setModifyOpen(false);
        }}
        onSave={() => {
          setModifyOpen(false);
        }}
        httpManager={HttpManager.fromEntity(props.http)}
      />
    </>
  );
}
