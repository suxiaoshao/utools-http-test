import React from 'react';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 选项卡内容的 prop
 * */
interface TabPanelProps {
  /**
   * 选项卡内存放的组件
   * */
  children?: React.ReactNode;
  /**
   * 此选项卡绑定的值
   * */
  index: number | string;
  /**
   * 应该被激活的选项卡绑定的值
   * */
  value: number | string;
  /**
   * 选项卡组件的值
   * */
  className?: string;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 选项卡不被激活时不在 dom 上
 * */
export function TabPanelDisappear(props: TabPanelProps): JSX.Element {
  return props.index !== props.value ? <></> : <div className={props.className}>{props.children}</div>;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 选项卡不被激活时会将元素从 可访问性树 accessibility tree 中移除,
 * 但是还在 dom 树山,子组件还是会保留
 * */
export function TabPanelHidden(props: TabPanelProps): JSX.Element {
  return (
    <div className={props.className} style={props.index !== props.value ? { display: 'none' } : undefined}>
      {props.children}
    </div>
  );
}
