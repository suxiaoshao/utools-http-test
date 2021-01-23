import React, { SetStateAction } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, IconButton, InputBase, Paper, Tooltip, Typography } from '@material-ui/core';
import { ExpandLess, MoreHoriz } from '@material-ui/icons';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: `calc(100% - ${theme.spacing(2) * 2}px)`,
      margin: theme.spacing(2),
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

export default function HistoryFilter(props: {
  searchName: string;
  onSearchChange(newSearchName: string): void;
  filterOpen: boolean;
  onFilterOpenChange(newValue: SetStateAction<boolean>): void;
}): JSX.Element {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <InputBase
        value={props.searchName}
        onChange={(event) => {
          props.onSearchChange(event.target.value);
        }}
        className={classes.input}
        placeholder="筛选 http 名"
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title={<Typography variant="body2">{props.filterOpen ? '收起筛选' : '更多筛选'}</Typography>}>
        <IconButton
          onClick={() => {
            props.onFilterOpenChange((value) => !value);
          }}
          className={classes.iconButton}
          aria-label="directions"
        >
          {props.filterOpen ? <ExpandLess /> : <MoreHoriz />}
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
