import React, { MutableRefObject } from 'react';
import { IconButton, InputBase, TableCell, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useForceUpdate } from '../../../utils/hooks/useForceUpdate';
import { useReStyle } from '../../../utils/hooks/useRestyle';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 添加数据的表格的数据部分
 * */
export default function UpdateTable(props: {
  /**
   * 键值对数据列表
   * */
  mapList: { value: string; key: string }[];
  /**
   * 最后一个 key input 的引用
   * */
  keyRef: MutableRefObject<HTMLInputElement | null>;
  /**
   * 最后一个 value input 的引用
   * */
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
