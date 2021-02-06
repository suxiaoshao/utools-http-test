import { Store } from './classStore';
import { HttpManager } from '../http/httpManager';
import { HttpEntity } from '../../database/entity/http.entity';

export class HttpArray extends Store<HttpManager[]> {
  constructor() {
    super([HttpManager.getNewHttp()]);
  }

  public addHttpManager(): number {
    this.setData([...this.data, HttpManager.getNewHttp()]);
    return this.data.length - 1;
  }

  public deleteHttpManager(index: number): number {
    this.data.splice(index, 1);
    this.update();
    return this.data.length - 1;
  }

  public isDeleteHttpManager(): boolean {
    return this.data.length > 1;
  }

  public update(): void {
    this.setData([...this.data]);
  }

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
