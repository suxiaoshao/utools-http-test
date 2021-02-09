import React from 'react';
import { Card, CardContent, CardHeader, createStyles, IconButton, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TagItem from '../../../components/common/tag/tagItem';
import AddTag from '../../../components/common/tag/addTag';
import { AddCircle, ArrowBack, ArrowForward } from '@material-ui/icons';
import { TagEntity } from '../../../database/entity/tag.entity';
import { useAllTags } from '../../../util/hook/useAllTags';

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

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description tagsForm 的 prop
 * */
export interface TagsFormProp {
  /**
   * 被选择的 tags
   * */
  selectedTags: TagEntity[];
  /**
   * 组件的类名
   * */
  className?: string;

  /**
   * 触发被选择 tags 更新的方法
   * */
  onSelectedTasChanges(newSelectedTags: TagEntity[]): void;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description tags 选择表单组件
 * */
export default function TagsForm(props: TagsFormProp): JSX.Element {
  const style = useStyles();
  /**
   * 所有的 tags
   * */
  const allTags = useAllTags();
  /**
   * 没选择的 tags
   * */
  const unselectedTags = React.useMemo<TagEntity[]>(() => {
    return allTags.filter((value) => !props.selectedTags.some((value1) => value1.tagId === value.tagId));
  }, [allTags, props.selectedTags]);
  return (
    <div className={`${style.main} ${props.className}`}>
      {/* 已被选择的标签 */}
      <Card className={style.tags}>
        <CardHeader
          title="已被选择的标签"
          action={
            /**
             * 清除所有选择的标签
             * */
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
              onClick={() => {
                const newSelectedTags = props.selectedTags.filter((value1) => value1.tagId !== value.tagId);
                props.onSelectedTasChanges(newSelectedTags);
              }}
            />
          ))}
        </CardContent>
      </Card>
      {/* 未被选择的标签 */}
      <Card className={style.tags}>
        <CardHeader
          title="未被选择的标签"
          action={
            /**
             * 全部选中
             * */
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
              tagEntity={value}
              key={value.tagId}
              icon={<AddCircle />}
            />
          ))}
        </CardContent>
        <AddTag />
      </Card>
    </div>
  );
}
