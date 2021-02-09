import React from 'react';
import { CardActions, createStyles, IconButton, TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { TagEntity } from '../../../database/entity/tag.entity';

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
    },
    input: {
      flex: '1 1 0',
    },
  }),
);
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 用于添加一个 tag
 * */
export default function AddTag(): JSX.Element {
  const style = useStyle();
  const [name, setName] = React.useState<string>('');
  return (
    <CardActions className={style.main}>
      <TextField
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        label="新标签名"
        error={name === ''}
        className={style.input}
        helperText={name === '' ? '标签名不可为空' : undefined}
      />
      <IconButton
        color="primary"
        onClick={async () => {
          const tagEntity = new TagEntity(null, name);
          await tagEntity.save();
          setName('');
        }}
        disabled={name === ''}
      >
        <Add />
      </IconButton>
    </CardActions>
  );
}
