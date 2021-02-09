import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ButtonProps, Divider, InputBase, Paper, Tooltip, Typography } from '@material-ui/core';
import { TagEntity } from '../../database/entity/tag.entity';
import MySelector, { ItemListProp, MySelectorProp } from '../common/mySelector';
import { MyMethod } from '../../util/http/httpManager';
import { myMethodList } from '../work/url/methodSelector';
import HistoryTags from './historyTags';

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      width: `calc(100% - ${theme.spacing(2) * 2}px)`,
      margin: theme.spacing(2),
    },
    form: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);
const itemList = [
  {
    value: undefined,
    text: '全部匹配',
  },
  ...(myMethodList as ItemListProp<MyMethod | undefined>[]),
];

const ThisSelector = React.forwardRef<HTMLButtonElement, MySelectorProp<MyMethod | undefined> & ButtonProps>(
  MySelector,
);

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description historyFilter 组件的 prop
 * */
export interface HistoryFilterProp {
  /**
   * 筛选的名字,为空时不筛选
   * */
  searchName: string;
  /**
   * 筛选的 tags,为空时不筛选
   * */
  tags: TagEntity[];
  /**
   * 赛选的方法名, undefined 时不筛选方法
   * */
  method: MyMethod | undefined;

  /**
   * 改变筛选的方法触发的方法
   * */
  ocChangeMethod(newMethod: MyMethod | undefined): void;

  /**
   * 改变筛选的名字触发的方法
   * */
  onSearchChange(newSearchName: string): void;

  /**
   * 改变筛选的 tags 触发的方法
   * */
  onChangeTags(newTags: TagEntity[]): void;
}
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 筛选历史的组件
 * */
export default function HistoryFilter(props: HistoryFilterProp): JSX.Element {
  const classes = useStyles();
  return (
    <Paper className={classes.main}>
      <form className={classes.form}>
        {/* 筛选 http 方法 */}
        <Tooltip title={<Typography variant={'body2'}>筛选 http 方法</Typography>}>
          <ThisSelector
            className={classes.iconButton}
            value={props.method}
            onValueChange={props.ocChangeMethod}
            itemList={itemList}
          />
        </Tooltip>
        <Divider className={classes.divider} orientation="vertical" />
        {/* 匹配 http 名字和 url */}
        <InputBase
          value={props.searchName}
          onChange={(event) => {
            props.onSearchChange(event.target.value);
          }}
          className={classes.input}
          placeholder="匹配 http 名字和 url"
        />
      </form>
      <Divider variant="middle" />
      {/* 筛选 tags */}
      <HistoryTags selectedTags={props.tags} onSelectedTasChanges={props.onChangeTags} />
    </Paper>
  );
}
