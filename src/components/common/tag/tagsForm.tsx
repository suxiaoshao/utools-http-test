import React from 'react';
import { Card, CardContent, CardHeader, createStyles, IconButton, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TagEntity } from '../../../database/entity/tag.entity';
import TagItem from '../../../components/common/tag/tagItem';
import AddTag from '../../../components/common/tag/addTag';
import { AddCircle, ArrowBack, ArrowForward } from '@material-ui/icons';
import { useUpdateAllTags } from '../../../util/hook/useUpdateAllTags';

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      display: 'flex',
    },
    tags: {
      flex: '1 1 0',
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(1),
    },
    tagContent: {
      display: 'flex',
      overflow: 'auto',
      flexWrap: 'wrap',
      flex: '1 1 0',
      position: 'relative',
    },
    tag: {
      margin: theme.spacing(1),
    },
  }),
);
export default function TagsForm(props: {
  selectedTags: TagEntity[];
  onSelectedTasChanges(newSelectedTags: TagEntity[]): void;
  className?: string;
}): JSX.Element {
  const style = useStyles();
  const { allTags, update } = useUpdateAllTags(props.selectedTags, props.onSelectedTasChanges);
  const unselectedTags = React.useMemo<TagEntity[]>(() => {
    return allTags.filter((value) => !props.selectedTags.some((value1) => value1.tagId === value.tagId));
  }, [allTags, props.selectedTags]);
  return (
    <div className={`${style.main} ${props.className}`}>
      <Card className={style.tags}>
        <CardHeader
          title="已被选择的标签"
          action={
            <Tooltip title={<Typography variant={'body2'}>全部清除</Typography>}>
              <div>
                <IconButton
                  onClick={() => {
                    props.onSelectedTasChanges([]);
                  }}
                  disabled={props.selectedTags.length === 0}
                >
                  <ArrowForward />
                </IconButton>
              </div>
            </Tooltip>
          }
        />
        <CardContent className={style.tagContent}>
          {props.selectedTags.map((value) => (
            <TagItem
              className={style.tag}
              key={value.tagId}
              tagEntity={value}
              onChange={update}
              onClick={() => {
                const newSelectedTags = props.selectedTags.filter((value1) => value1.tagId !== value.tagId);
                props.onSelectedTasChanges(newSelectedTags);
              }}
            />
          ))}
        </CardContent>
      </Card>
      <Card className={style.tags}>
        <CardHeader
          title="未被选择的标签"
          action={
            <Tooltip title={<Typography variant={'body2'}>全部选中</Typography>}>
              <div>
                <IconButton
                  disabled={unselectedTags.length === 0}
                  onClick={() => {
                    props.onSelectedTasChanges([...allTags]);
                  }}
                >
                  <ArrowBack />
                </IconButton>
              </div>
            </Tooltip>
          }
        />
        <CardContent className={style.tagContent}>
          {unselectedTags.map((value) => (
            <TagItem
              className={style.tag}
              onClick={() => {
                const newSelectedTags = [...props.selectedTags, value];
                props.onSelectedTasChanges(newSelectedTags);
              }}
              onChange={update}
              tagEntity={value}
              key={value.tagId}
              icon={<AddCircle />}
            />
          ))}
        </CardContent>
        <AddTag onAdd={update} />
      </Card>
    </div>
  );
}
