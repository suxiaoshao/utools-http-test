import { Button, ButtonProps, createStyles, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export type ItemListProp<T> = { value: T; text: React.ReactNode };
const useStyle = makeStyles(() =>
  createStyles({
    button: {
      textTransform: 'none',
    },
  }),
);

export default function MySelector<T extends number | string>(
  props: {
    value: T;
    onValueChange(newValue: T): void;
    itemList: ItemListProp<T>[];
  } & ButtonProps,
): JSX.Element {
  const style = useStyle();
  const [menuEl, setMenuEl] = React.useState<HTMLButtonElement | null>(null);
  return (
    <>
      <Button
        {...props}
        className={style.button}
        onClick={(e) => {
          setMenuEl(e.currentTarget);
        }}
      >
        {props.value}
      </Button>
      <Menu
        open={Boolean(menuEl)}
        anchorEl={menuEl}
        onClose={() => {
          setMenuEl(null);
        }}
      >
        {props.itemList.map((item) => (
          <MenuItem
            selected={item.value == props.value}
            key={item.value}
            onClick={() => {
              props.onValueChange(item.value);
              setMenuEl(null);
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
