import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number | string;
  value: number | string;
  className?: string;
}

export function TabPanelDisappear(props: TabPanelProps): JSX.Element {
  return props.index !== props.value ? <></> : <div className={props.className}>{props.children}</div>;
}

export function TabPanelHidden(props: TabPanelProps): JSX.Element {
  return (
    <div className={props.className} style={props.index !== props.value ? { display: 'none' } : undefined}>
      {props.children}
    </div>
  );
}
