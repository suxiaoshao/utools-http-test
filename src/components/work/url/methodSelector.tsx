import React from 'react';
import { Method } from 'axios';
import MySelector from '../../common/mySelector';
import { HttpContext } from '../workPanel';
import { useForceUpdate } from '../../../util/hook/useForceUpdate';
import { useUrlStyles } from './urlPaper';

const httpMethod: { text: string; value: Method }[] = ([
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'OPTIONS',
  'PATCH',
] as const).map((value: Method) => {
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
    <MySelector<Method>
      value={httpManager.method}
      onValueChange={(newValue) => {
        httpManager.method = newValue;
        forceUpdate();
      }}
      itemList={httpMethod}
      className={style.iconButton}
    />
  );
}
