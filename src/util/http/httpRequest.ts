import { RequestXForm, XFormProps } from './requestXForm';
import { RequestUploadFile, UploadFileProps } from './requestUploadFile';
import { Header, HeaderProps, OtherHeader } from './header';
import Form from 'form-data';
import { RequestEntity } from '../../database/entity/request.entity';
import { sqlStore } from '../store/sqlStore';

export type RequestBodyChoose = 'none' | 'text' | 'form-data' | 'x-www-form-urlencoded';
export type RequestTextChoose = 'json' | 'html' | 'xml' | 'javascript' | 'plain';

export interface HeaderObject {
  [key: string]: string;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http 的 request 部分
 * */
export class HttpRequest {
  /**
   * body 选择
   * */
  bodyChoose: RequestBodyChoose;
  /**
   * body 为 text 时,text 类型选择
   * */
  textChoose: RequestTextChoose;
  text: string;
  dataForms: RequestUploadFile[];
  xForms: RequestXForm[];
  headers: Header[];
  requestId: number | null;

  constructor(
    requestId: number | null,
    bodyChoose: RequestBodyChoose,
    textChoose: RequestTextChoose,
    text: string,
    dataForms: RequestUploadFile[],
    xForms: RequestXForm[],
    headers: Header[],
  ) {
    this.requestId = requestId;
    this.bodyChoose = bodyChoose;
    this.textChoose = textChoose;
    this.text = text;
    this.dataForms = dataForms;
    this.xForms = xForms;
    this.headers = headers;
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 获取一个新的 http request
   * */
  static getNewRequestContent(): HttpRequest {
    return new HttpRequest(
      null,
      'none',
      'plain',
      '',
      [],
      [],
      [
        new Header(
          'User-Agent',
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 Edg/83.0.478.45',
        ),
        new Header('Accept', '*/*'),
        new Header('Accept-Encoding', 'gzip, deflate, br'),
        new Header('Connection', 'keep-alive'),
      ],
    );
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 获取从其他值中获取的 header
   * */
  private getOtherContentType(): OtherHeader | undefined {
    const contentTypeHeader = new OtherHeader(
      'Content-Type',
      '',
      this.headers.some((value) => value.key === 'Content-Type' || value.key === 'content-type'),
    );

    switch (this.bodyChoose) {
      case 'text':
        switch (this.textChoose) {
          case 'xml':
            contentTypeHeader.value = 'text/xml; charset=utf-8';
            break;
          case 'html':
            contentTypeHeader.value = 'text/html; charset=utf-8';
            break;
          case 'plain':
            contentTypeHeader.value = 'text/plain; charset=utf-8';
            break;
          case 'javascript':
            contentTypeHeader.value = 'text/javascript; charset=utf-8';
            break;
          case 'json':
            contentTypeHeader.value = 'application/json; charset=utf-8';
            break;
        }
        break;
      case 'x-www-form-urlencoded':
        contentTypeHeader.value = 'application/x-www-form-urlencoded';
        break;
      case 'form-data':
        contentTypeHeader.value = 'multipart/form-data; boundary=<calculated when response is sent>';
        break;
      case 'none':
        break;
    }
    if (contentTypeHeader.value !== '') {
      return contentTypeHeader;
    } else {
      return undefined;
    }
  }

  public async getOtherHeaders(url: string): Promise<OtherHeader[]> {
    const otherHeaders: Array<OtherHeader> = [];
    const contentTypeHeader = this.getOtherContentType();
    if (contentTypeHeader !== undefined) {
      otherHeaders.push(contentTypeHeader);
    }
    const cookieString = sqlStore.getCookieByUrl(url);
    if (cookieString !== '') {
      otherHeaders.push(
        new OtherHeader(
          'cookie',
          cookieString,
          this.headers.some((value) => value.key === 'cookie' || value.key === 'Cookie'),
        ),
      );
    }
    return otherHeaders;
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 根据 bodyChoose,textChoose 获取 http body 部分数据
   * */
  public getData(): undefined | URLSearchParams | string | Form {
    switch (this.bodyChoose) {
      case 'none':
        return undefined;
      case 'form-data':
        const formData = new window.formData();
        this.dataForms.forEach((value) => {
          const data = value.getData();
          if (value.isFile && window.buffer.isBuffer(data)) {
            formData.append(value.key, data, value.getFileName());
          } else {
            formData.append(value.key, data);
          }
        });
        return formData;
      case 'x-www-form-urlencoded':
        const params = new URLSearchParams();
        this.xForms.forEach((value) => {
          params.append(value.key, value.value);
        });
        return params;
      case 'text':
        switch (this.textChoose) {
          case 'json':
            return JSON.parse(this.text);
          default:
            return this.text;
        }
    }
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 获取 http 数据和 header
   * */
  public async getHeaderAndData(
    url: string,
  ): Promise<{
    headers: HeaderObject;
    data: undefined | URLSearchParams | string | Form;
  }> {
    const data = this.getData();
    const headerObject: HeaderObject = {};
    (await this.getOtherHeaders(url)).forEach((value) => {
      if (!value.isDelete) {
        headerObject[value.key] = value.value;
      }
    });
    if (data instanceof window.formData) {
      Object.assign(headerObject, data.getHeaders());
    }
    this.headers.forEach((value) => {
      headerObject[value.key] = value.value;
    });
    return {
      headers: headerObject,
      data: data,
    };
  }

  public getRequestEntity(): RequestEntity {
    return new RequestEntity(
      this.requestId,
      this.bodyChoose,
      this.textChoose,
      this.text,
      JSON.stringify(this.dataForms),
      JSON.stringify(this.xForms),
      JSON.stringify(this.headers),
    );
  }

  public changeFormRequestEntity(requestEntity: RequestEntity): void {
    this.requestId = requestEntity.requestId;
    this.bodyChoose = requestEntity.bodyChoose ?? this.bodyChoose;
    this.textChoose = requestEntity.textChoose ?? this.textChoose;
    this.text = requestEntity.text ?? this.text;
    this.dataForms = (JSON.parse(
      requestEntity.dataForms ?? JSON.stringify(this.dataForms),
    ) as UploadFileProps[]).map((value) => RequestUploadFile.formUploadFileProps(value));
    this.xForms = (JSON.parse(requestEntity.xForms ?? JSON.stringify(this.xForms)) as XFormProps[]).map((value) =>
      RequestXForm.formXFormProps(value),
    );
    this.headers = (JSON.parse(requestEntity.headers ?? JSON.stringify(this.headers)) as HeaderProps[]).map((value) =>
      Header.formHeaderProp(value),
    );
  }
}
