import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, InputBase, Paper, Tooltip, Typography } from '@material-ui/core';
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

const ThisSelector = React.forwardRef<HTMLButtonElement, MySelectorProp<MyMethod | undefined>>(MySelector);

export default function HistoryFilter(props: {
  searchName: string;
  onSearchChange(newSearchName: string): void;
  onChangeTags(newTags: TagEntity[]): void;
  tags: TagEntity[];
  method: MyMethod | undefined;
  ocChangeMethod(newMethod: MyMethod | undefined): void;
}): JSX.Element {
  const classes = useStyles();
  return (
    <Paper className={classes.main}>
      <form className={classes.form}>
        <Tooltip title={<Typography variant={'body2'}>筛选 http 方法</Typography>}>
          <ThisSelector
            className={classes.iconButton}
            value={props.method}
            onValueChange={props.ocChangeMethod}
            itemList={itemList}
          />
        </Tooltip>
        <Divider className={classes.divider} orientation="vertical" />
        <InputBase
          value={props.searchName}
          onChange={(event) => {
            props.onSearchChange(event.target.value);
          }}
          className={classes.input}
          placeholder="筛选 http 名"
        />
      </form>
      <Divider variant="middle" />
      <HistoryTags selectedTags={props.tags} onSelectedTasChanges={props.onChangeTags} />
    </Paper>
  );
}
