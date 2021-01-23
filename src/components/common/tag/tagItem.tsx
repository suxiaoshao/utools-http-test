import React from 'react';
import { Chip, Menu, MenuItem, TextField } from '@material-ui/core';
import { TagEntity } from '../../../database/entity/tag.entity';
import { TagMapper } from '../../../database/mapper/tagMapper';

export default function TagItem(props: {
  tagEntity: TagEntity;
  onChange(): void;
  onClick(): void;
  icon?: React.ReactElement;
  className?: string;
}): JSX.Element {
  const [open, setOpen] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const update = React.useCallback(async () => {
    props.tagEntity.tagName = name || props.tagEntity.tagName;
    await TagMapper.saveTags(props.tagEntity);
    setName(null);
    props.onChange();
  }, [name, props]);
  return (
    <>
      <Chip
        className={props.className}
        color={name === null ? 'primary' : undefined}
        label={
          name !== null ? (
            <TextField
              onBlur={async () => {
                await update();
              }}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              onKeyUp={async (event) => {
                if (event.key === 'Enter') {
                  await update();
                }
              }}
              error={name === ''}
              helperText={name === '' ? '新名字不可为空' : undefined}
            />
          ) : (
            props.tagEntity.tagName
          )
        }
        onDelete={async () => {
          props.onClick();
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          setOpen({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          });
        }}
        deleteIcon={props.icon}
      />
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={open !== null ? { top: open.mouseY, left: open.mouseX } : undefined}
        open={open !== null}
        onClose={() => {
          setOpen(null);
        }}
      >
        <MenuItem
          onClick={() => {
            setName(props.tagEntity.tagName ?? '');
            setOpen(null);
          }}
        >
          重命名
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await TagMapper.deleteTags([props.tagEntity]);
            props.onChange();
            setOpen(null);
          }}
        >
          删除
        </MenuItem>
      </Menu>
    </>
  );
}
