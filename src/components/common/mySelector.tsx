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

export type MySelectorProp<T extends number | string | undefined | null> = {
  value: T;
  onValueChange(newValue: T): void;
  itemList: ItemListProp<T>[];
} & ButtonProps;

function MySelector<T extends number | string | undefined | null>(
  props: MySelectorProp<T>,
  ref?: ((instance: HTMLButtonElement | null) => void) | React.RefObject<HTMLButtonElement> | null | undefined,
): JSX.Element {
  const style = useStyle();
  const [menuEl, setMenuEl] = React.useState<HTMLButtonElement | null>(null);
  return (
    <>
      <Button
        {...props}
        className={`${style.button} ${props.className}`}
        onClick={(e) => {
          setMenuEl(e.currentTarget);
        }}
        ref={typeof ref === 'function' ? ref : undefined}
      >
        {props.itemList.find((value) => value.value === props.value)?.text ?? '不是合法的值'}
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

export default MySelector;
