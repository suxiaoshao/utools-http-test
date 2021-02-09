import { AxiosError, AxiosResponse, CancelTokenSource } from 'axios';
import { HttpResponse } from './httpResponse';
import { HttpRequest } from './httpRequest';
import { HttpEntity } from '../../database/entity/http.entity';
import { TagEntity } from '../../database/entity/tag.entity';

export type MyMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http 管理器,用于管理 http 的各种行为,和储存数据
 * */
export class HttpManager {
  httpId: null | number;
  url: string;
  name: string;
  /**
   * 当前页面是否显示 request 页面
   * */
  isRequest: boolean;
  method: MyMethod;
  request: HttpRequest;
  response: HttpResponse;
  /**
   * http 是否在发送中
   * */
  loading: boolean;
  /**
   * axios 取消发送的 token
   * */
  tokenSource: undefined | CancelTokenSource;

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 生成一个新的 httpManger,用于新建 http 请求
   * */
  public static getNewHttp(): HttpManager {
    return new HttpManager(
      null,
      '',
      '',
      true,
      'GET',
      HttpRequest.getNewRequestContent(),
      HttpResponse.getNewResponseContent(),
    );
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 从数据库的 http 抽象获取 httpManger
   * */
  public static fromEntity(httpEntity: HttpEntity): HttpManager {
    const newHttp = HttpManager.getNewHttp();
    newHttp.changeFormHttpEntity(httpEntity);
    return newHttp;
  }

  constructor(
    httpId: number | null,
    url: string,
    name: string,
    isRequest: boolean,
    method: MyMethod,
    requestContent: HttpRequest,
    responseContent: HttpResponse,
  ) {
    this.httpId = httpId;
    this.method = method;
    this.url = url;
    this.isRequest = isRequest;
    this.name = name;
    this.request = requestContent;
    this.response = responseContent;

    this.loading = false;
    this.tokenSource = undefined;
  }

  public clone(): HttpManager {
    return new HttpManager(this.httpId, this.url, this.name, this.isRequest, this.method, this.request, this.response);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description http 发送
   * @return {string} 异常信息,如果没有异常为 void
   * */
  public async httpSend(): Promise<string | void> {
    /**
     * 初始化 httpManager 数据
     * */
    const startTime = Date.now();
    this.response.url = this.url;
    this.response.contentType = 'none';
    this.tokenSource = window.axios.CancelToken.source();
    /**
     * 发送
     * */
    return await window
      .axios({
        method: this.method,
        url: this.url,
        responseType: 'arraybuffer',
        cancelToken: this.tokenSource.token,
        ...(await this.request.getHeaderAndData(this.url)),
      })
      .then((e: AxiosResponse<Buffer>) => {
        /**
         * 成功
         * */
        console.log(e);
        this.response.setData(e.headers, this.url, e.data, startTime, Date.now());
      })
      .catch((e: AxiosError<Buffer>) => {
        if (e.response) {
          /**
           * 异常,但是已经取到 response 数据
           * */
          console.log(e.response);
          console.log(e.message);
          this.response.setData(e.response.headers, this.url, e.response.data, startTime, Date.now());
        } else {
          /**
           * 异常,为获取 response 数据
           * */
          console.log(e.message);
          this.response.setData({}, this.url, window.buffer.from(e.message), startTime, Date.now());
          this.response.contentType = 'error';
        }
        return e.message;
      })
      .finally((value: void | string) => {
        this.tokenSource = undefined;
        return value;
      });
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 从 http 数据库抽象获取 httpManager
   * */
  public getHttpEntity(tags: TagEntity[]): HttpEntity {
    const requestEntity = this.request.getRequestEntity();
    return new HttpEntity(this.httpId, this.url, this.name, this.method, requestEntity, tags);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 从 http 数据库抽象中修改当前 httpManager
   * */
  public changeFormHttpEntity(httpEntity: HttpEntity): void {
    this.httpId = httpEntity.httpId;
    this.name = httpEntity.name;
    this.method = httpEntity.method;
    this.url = httpEntity.url;
    if (httpEntity.request !== undefined) {
      this.request.changeFormRequestEntity(httpEntity.request);
    }
  }
}
