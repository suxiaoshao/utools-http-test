import { Reducer, useReducer } from 'react';

export interface NoneFunc {
  (): void;
}

export function useForceUpdate(): NoneFunc {
  const [, forceUpdate] = useReducer<Reducer<number, string>>((x) => x + 1, 0);
  return () => {
    forceUpdate('');
  };
}
