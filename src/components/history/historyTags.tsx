import React from 'react';
import { Chip, createStyles, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAllTags } from '../../util/hook/useAllTags';
import { TagEntity } from '../../database/entity/tag.entity';

const useStyle = makeStyles((theme) =>
  createStyles({
    main: {
      padding: theme.spacing(1),
    },
    tags: {
      width: '100%',
      display: 'flex',
      overflow: 'auto',
    },
    tag: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description historyTags 的 prop
 * */
export interface HistoryTagsProp {
  /**
   * 被选中的 tags
   * */
  selectedTags: TagEntity[];

  /**
   * tags 改变时触发的方法
   * */
  onSelectedTasChanges(newSelectedTags: TagEntity[]): void;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description historyTags 组件
 * */
export default function HistoryTags(props: HistoryTagsProp): JSX.Element {
  const classes = useStyle();
  /**
   * 数据库中所有的 tags
   * */
  const allTags = useAllTags();
  return (
    <div className={classes.main}>
      <Typography gutterBottom variant="body1">
        筛选标签
      </Typography>
      <div className={classes.tags}>
        {allTags.map((value) => (
          <Chip
            className={classes.tag}
            onClick={() => {
              /**
               * 此 tag 在被选择的 tags 中时,在被选择的 tags 中删除这个 tag
               * */
              if (props.selectedTags.some((value1) => value1.tagId === value.tagId)) {
                const newSelectedTags = props.selectedTags.filter((value1) => value1.tagId !== value.tagId);
                props.onSelectedTasChanges(newSelectedTags);
              } else {
                /**
                 * 此 tag 不在被选择的 tags 中时,添加这个 tag 到被选择的 tags 中
                 * */
                const newSelectedTags = [...props.selectedTags, value];
                props.onSelectedTasChanges(newSelectedTags);
              }
            }}
            key={value.tagId}
            label={value.tagName}
            color={props.selectedTags.some((value1) => value1.tagId === value.tagId) ? 'primary' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
