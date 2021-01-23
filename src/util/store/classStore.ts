import { useEffect, useState } from 'react';

export interface ListenFuncList<T> {
  func: (newData: T) => void;
  code: number;
}

export class Store<Data> {
  protected data: Data;
  private listenFuncList: ListenFuncList<Data>[];
  private listenCodeNum: number;

  constructor(initData: Data) {
    this.data = initData;
    this.listenFuncList = [];
    this.listenCodeNum = 0;
  }

  public setData(newData: Data): void {
    this.data = newData;
    this.notify();
  }

  public getData(): Data {
    return this.data;
  }

  protected notify(): void {
    this.listenFuncList.forEach((value) => {
      value.func(this.data);
    });
  }

  public addListen(func: (newValue: Data) => void): number {
    this.listenCodeNum++;
    this.listenFuncList.push({ func: func, code: this.listenCodeNum });
    return this.listenCodeNum;
  }

  public deleteListen(code: number): void {
    this.listenFuncList = this.listenFuncList.filter((value) => value.code !== code);
  }

  public getFunc(): () => [Data, (newData: Data) => void] {
    return (): [Data, (newData: Data) => void] => {
      const [value, setValue] = useState<Data>(this.getData());
      useEffect(() => {
        const flag = this.addListen((newData) => {
          setValue(newData);
        });
        return () => {
          this.deleteListen(flag);
        };
      }, []);
      return [
        value,
        (newData) => {
          this.setData(newData);
        },
      ];
    };
  }
}
