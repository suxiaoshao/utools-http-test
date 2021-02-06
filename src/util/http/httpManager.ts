import { AxiosError, AxiosResponse, CancelTokenSource } from 'axios';
import { HttpResponse } from './httpResponse';
import { HttpRequest } from './httpRequest';
import { HttpEntity } from '../../database/entity/http.entity';
import { TagEntity } from '../../database/entity/tag.entity';

export type MyMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH';

export class HttpManager {
  httpId: null | number;
  url: string;
  name: string;
  isRequest: boolean;
  method: MyMethod;
  request: HttpRequest;
  response: HttpResponse;
  loading: boolean;
  tokenSource: undefined | CancelTokenSource;

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

  public async httpSend(): Promise<string | void> {
    const startTime = Date.now();
    this.response.url = this.url;
    this.response.contentType = 'none';
    this.tokenSource = window.axios.CancelToken.source();
    return await window
      .axios({
        method: this.method,
        url: this.url,
        responseType: 'arraybuffer',
        cancelToken: this.tokenSource.token,
        ...(await this.request.getHeaderAndData(this.url)),
      })
      .then((e: AxiosResponse<Buffer>) => {
        console.log(e);
        this.response.setData(e.headers, this.url, e.data, startTime, Date.now());
      })
      .catch((e: AxiosError<Buffer>) => {
        if (e.response) {
          console.log(e.response);
          console.log(e.message);
          this.response.setData(e.response.headers, this.url, e.response.data, startTime, Date.now());
        } else {
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

  public getHttpEntity(tags: TagEntity[]): HttpEntity {
    const requestEntity = this.request.getRequestEntity();
    return new HttpEntity(this.httpId, this.url, this.name, this.method, requestEntity, tags);
  }

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
