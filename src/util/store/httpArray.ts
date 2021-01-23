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
        if (httpManager.httpId !== undefined && httpEntity.httpId === httpManager.httpId) {
          httpManager.changeFormHttpEntity(httpEntity);
        }
      });
    });
    this.update();
  }

  public addFromHttpEntity(httpEntity: HttpEntity): number {
    const index = this.data.findIndex((value) => value.httpId === httpEntity.httpId);
    if (index !== -1) {
      return index;
    } else {
      const newHttp = HttpManager.getNewHttp();
      newHttp.changeFormHttpEntity(httpEntity);
      this.setData([...this.data, newHttp]);
      return this.data.length - 1;
    }
  }
}

export const httpArray = new HttpArray();

export const useHttpArray = httpArray.getFunc();
