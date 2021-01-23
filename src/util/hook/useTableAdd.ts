import React, { MutableRefObject } from 'react';
import { NoneFunc } from './useForceUpdate';

export function useTableAdd(
  deps: React.DependencyList,
): [NoneFunc, NoneFunc, MutableRefObject<HTMLInputElement | null>, MutableRefObject<HTMLInputElement | null>] {
  const [keyFlag, setKeyFlag] = React.useState<boolean>(false);
  const [valueFlag, setValueFlag] = React.useState<boolean>(false);
  const keyRef = React.useRef<HTMLInputElement>(null);
  const valueRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (keyFlag) {
      keyRef.current?.focus();
      setKeyFlag(false);
    }
    if (valueFlag) {
      valueRef.current?.focus();
      setValueFlag(false);
    }
    // eslint-disable-next-line
  }, deps);
  return [
    () => {
      setKeyFlag(true);
    },
    () => {
      setValueFlag(true);
    },
    keyRef,
    valueRef,
  ];
}
