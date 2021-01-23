import React, { MutableRefObject } from 'react';
import { IconButton, InputBase, TableCell, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useForceUpdate } from '../../../util/hook/useForceUpdate';
import { useReStyle } from '../../../util/hook/useRestyle';

export default function UpdateTable(props: {
  mapList: { value: string; key: string }[];
  keyRef: MutableRefObject<HTMLInputElement | null>;
  valueRef: MutableRefObject<HTMLInputElement | null>;
}): JSX.Element {
  const style = useReStyle();
  const forceUpdate = useForceUpdate();
  return (
    <>
      {props.mapList.map((value, index) => (
        <TableRow key={index}>
          <TableCell padding="none">
            <IconButton
              onClick={() => {
                props.mapList.splice(index, 1);
                forceUpdate();
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </TableCell>
          <TableCell>
            <InputBase
              className={style.tableInput}
              placeholder="key"
              value={value.key}
              inputRef={index === props.mapList.length - 1 ? props.keyRef : undefined}
              onChange={(event) => {
                value.key = event.target.value;
                forceUpdate();
              }}
            />
          </TableCell>
          <TableCell>
            <InputBase
              className={style.tableInput}
              placeholder="value"
              value={value.value}
              inputRef={index === props.mapList.length - 1 ? props.valueRef : undefined}
              onChange={(event) => {
                value.value = event.target.value;
                forceUpdate();
              }}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
