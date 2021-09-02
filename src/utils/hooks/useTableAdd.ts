import React, { MutableRefObject } from 'react';
import { NoneFunc } from './useForceUpdate';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 表格添加一行的 hooks,实现输入最后一行自动添加一行并把焦点转移到添加的那行
 * */
export function useTableAdd(deps: React.DependencyList): {
  /**
   * 修改 key 的 flag ,使需要更改时,让 keyInput 成为焦点
   * */
  setKeyFlag: NoneFunc;
  /**
   * 修改 value 的 flag ,使需要更改时,让 valueInput 成为焦点
   * */
  setValueFlag: NoneFunc;
  /**
   * key input 组件的引用
   * */
  keyRef: MutableRefObject<HTMLInputElement | null>;
  /**
   * value  input 的引用
   * */
  valueRef: MutableRefObject<HTMLInputElement | null>;
} {
  /**
   * key 的标志,新建一行时是输入 key 的话,设置为 true
   * */
  const [keyFlag, setKeyFlag] = React.useState<boolean>(false);
  /**
   * value 的标志,新建一行时是输入 value 的话,设置为 true
   * */
  const [valueFlag, setValueFlag] = React.useState<boolean>(false);
  /**
   * key input 组件的引用
   * */
  const keyRef = React.useRef<HTMLInputElement>(null);
  /**
   * value input 组件的引用
   * */
  const valueRef = React.useRef<HTMLInputElement>(null);
  /**
   * 根据外来参数的变化响应, 如果 keyFlag 为 true 则 key input 组件成为焦点
   * 如果 valueFlag 为 true 则 value input 组件成为焦点
   * */
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
  return {
    setKeyFlag: () => {
      setKeyFlag(true);
    },
    setValueFlag: () => {
      setValueFlag(true);
    },
    keyRef,
    valueRef,
  };
}
