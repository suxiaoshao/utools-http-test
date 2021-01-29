import React from 'react';
import MySelector from '../../common/mySelector';
import { HttpContext } from '../workPanel';
import { useForceUpdate } from '../../../util/hook/useForceUpdate';
import { useUrlStyles } from './urlPaper';
import { MyMethod } from '../../../util/http/httpManager';

export const myMethodList: { text: string; value: MyMethod }[] = ([
  'GET',
  'POST',
  'HEAD',
  'PUT',
  'DELETE',
  'OPTIONS',
  'PATCH',
] as const).map((value) => {
  return {
    text: value,
    value: value,
  };
});

export default function MethodSelector(): JSX.Element {
  const style = useUrlStyles();
  const forceUpdate = useForceUpdate();
  const { httpManager } = React.useContext(HttpContext);
  return (
    <MySelector<MyMethod>
      value={httpManager.method}
      onValueChange={(newValue) => {
        httpManager.method = newValue;
        forceUpdate();
      }}
      itemList={myMethodList}
      className={style.iconButton}
    />
  );
}
