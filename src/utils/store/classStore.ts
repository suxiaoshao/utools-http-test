import { useEffect, useState } from 'react';

export interface ListenFuncList<T> {
  func: (newData: T) => void;
  code: number;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 一个数据仓库
 * */
export class Store<Data> {
  /**
   * 保存的数据
   * */
  protected data: Data;
  /**
   * 监听列表
   * */
  private listenFuncList: ListenFuncList<Data>[];
  /**
   * 监听总数
   * */
  private listenCodeNum: number;

  constructor(initData: Data) {
    this.data = initData;
    this.listenFuncList = [];
    this.listenCodeNum = 0;
  }

  /**
   * 设置数据
   * */
  public setData(newData: Data): void {
    this.data = newData;
    this.notify();
  }

  /**
   * 获取数据
   * */
  public getData(): Data {
    return this.data;
  }

  /**
   * 通知所有监听过这个数据的函数
   * */
  protected notify(): void {
    this.listenFuncList.forEach((value) => {
      value.func(this.data);
    });
  }

  /**
   * 添加监听函数
   * */
  public addListen(func: (newValue: Data) => void): number {
    this.listenCodeNum++;
    this.listenFuncList.push({ func: func, code: this.listenCodeNum });
    return this.listenCodeNum;
  }

  /**
   * 删除监听函数
   * */
  public deleteListen(code: number): void {
    this.listenFuncList = this.listenFuncList.filter((value) => value.code !== code);
  }

  /**
   * 获取一个 hooks 函数用来设置和访问数据
   * */
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
