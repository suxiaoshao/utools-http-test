import { AxiosError, AxiosResponse, CancelTokenSource, Method } from 'axios';
import { HttpResponse } from './httpResponse';
import { HttpRequest } from './httpRequest';
import { HttpEntity } from '../../database/entity/http.entity';
import { TagEntity } from '../../database/entity/tag.entity';

export class HttpManager {
  httpId: undefined | number;
  url: string;
  name: string;
  isRequest: boolean;
  method: Method;
  request: HttpRequest;
  response: HttpResponse;
  loading: boolean;
  tokenSource: undefined | CancelTokenSource;

  static getNewHttp(): HttpManager {
    return new HttpManager(
      undefined,
      '',
      '',
      true,
      'GET',
      HttpRequest.getNewRequestContent(),
      HttpResponse.getNewResponseContent(),
    );
  }

  constructor(
    httpId: number | undefined,
    url: string,
    name: string,
    isRequest: boolean,
    method: Method,
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

  public async httpSend(): Promise<void> {
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
      })
      .finally(() => {
        this.tokenSource = undefined;
      });
  }

  public getHttpEntity(tags: TagEntity[]): HttpEntity {
    const httpEntity = new HttpEntity();
    httpEntity.httpId = this.httpId;
    httpEntity.url = this.url;
    httpEntity.method = this.method;
    httpEntity.name = this.name;
    httpEntity.request = this.request.getRequestEntity();
    httpEntity.tags = tags;
    return httpEntity;
  }

  public changeFormHttpEntity(httpEntity: HttpEntity): void {
    this.httpId = httpEntity.httpId;
    this.name = httpEntity.name ?? this.name;
    this.method = httpEntity.method ?? this.method;
    this.url = httpEntity.url ?? this.url;
    if (httpEntity.request !== undefined) {
      this.request.changeFormRequestEntity(httpEntity.request);
    }
  }
}
