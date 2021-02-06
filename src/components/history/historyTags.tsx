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

export default function HistoryTags(props: {
  selectedTags: TagEntity[];
  onSelectedTasChanges(newSelectedTags: TagEntity[]): void;
}): JSX.Element {
  const classes = useStyle();
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
              if (props.selectedTags.some((value1) => value1.tagId === value.tagId)) {
                const newSelectedTags = props.selectedTags.filter((value1) => value1.tagId !== value.tagId);
                props.onSelectedTasChanges(newSelectedTags);
              } else {
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
