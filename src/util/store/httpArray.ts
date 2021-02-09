import { Store } from './classStore';
import { HttpManager } from '../http/httpManager';
import { HttpEntity } from '../../database/entity/http.entity';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description httpManager 列表
 * */
export class HttpArray extends Store<HttpManager[]> {
  constructor() {
    super([HttpManager.getNewHttp()]);
  }

  /**
   * 添加
   * @return {number} httpManager 的总数
   * */
  public addHttpManager(): number {
    this.setData([...this.data, HttpManager.getNewHttp()]);
    return this.data.length - 1;
  }

  /**
   * 删除
   * @param index {number} 需要删除的 httpManager 的下标
   * @return {number} httpManager 的总数
   * */
  public deleteHttpManager(index: number): number {
    this.data.splice(index, 1);
    this.update();
    return this.data.length - 1;
  }

  /**
   * 是否能删除
   * */
  public isDeleteHttpManager(): boolean {
    return this.data.length > 1;
  }

  /**
   * 更新数据
   * */
  public update(): void {
    this.setData([...this.data]);
  }

  /**
   * 从数据库变化中修改数据,主要是删除已经被数据库删除的 httpManager 的 httpId
   * */
  public change(httpEntities: HttpEntity[]): void {
    this.data.forEach((httpManager) => {
      httpEntities.forEach((httpEntity) => {
        if (httpManager.httpId !== null && httpEntity.httpId === httpManager.httpId) {
          httpManager.changeFormHttpEntity(httpEntity);
        }
      });
    });
    this.update();
  }

  /**
   * 从数据库 http 抽象中添加数据,如果存在,则直接让这个数据激活
   * */
  public addFromHttpManager(httpManager: HttpManager): number {
    const index = this.data.findIndex((value) => value.httpId === httpManager.httpId);
    if (index !== -1) {
      return index;
    } else {
      const newHttp = httpManager.clone();
      this.setData([...this.data, newHttp]);
      return this.data.length - 1;
    }
  }

  /**
   * @description 每次更新后修改数据
   * @param {HttpEntity[]} httpEntities 数据库中保存的 http 数据
   * */
  public asyncBySqlUpdate(httpEntities: HttpEntity[]): void {
    this.data
      .filter(
        (httpManager) =>
          httpManager.httpId !== null && !httpEntities.some((httpEntity) => httpEntity.httpId === httpManager.httpId),
      )
      .forEach((value) => {
        value.httpId = null;
        value.request.requestId = null;
      });
    this.update();
  }
}

export const httpArray = new HttpArray();

export const useHttpArray = httpArray.getFunc();
