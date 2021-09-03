import { Header } from './header';
import { Cookie } from './cookie';

export type ResponseContentType = 'text' | 'image' | 'none' | 'error';
export type ResponseTextType = 'plain' | 'json' | 'xml' | 'html' | 'css' | 'javascript';

export interface AxiosHeaderObject {
  [key: string]: string | string[];
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description http response 部分
 * */
export class HttpResponse {
  contentType: ResponseContentType;
  /**
   * 编码方式
   * */
  charset: string;
  arrayBuffer: ArrayBuffer;
  headers: Header[];
  responseTime: number;
  responseStatus: number;
  textType: ResponseTextType;
  url: string;
  startTime: number;

  constructor(
    contentType: ResponseContentType,
    charset: string,
    buffer: ArrayBuffer,
    headers: Header[],
    responseTime: number,
    responseStatus: number,
    textType: ResponseTextType,
    url: string,
    startTime: number,
  ) {
    this.contentType = contentType;
    this.charset = charset;
    this.arrayBuffer = buffer;
    this.headers = headers;
    this.responseStatus = responseStatus;
    this.responseTime = responseTime;
    this.textType = textType;
    this.url = url;
    this.startTime = startTime;
  }

  static getNewResponseContent(): HttpResponse {
    return new HttpResponse('none', 'utf-8', new ArrayBuffer(0), [], -1, -1, 'plain', '', -1);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 从 axios 返回的数据中获取 response 的数据
   * */
  public setData(
    headerObject: AxiosHeaderObject,
    url: string,
    buffer: ArrayBuffer,
    startTime: number,
    endTime: number,
  ): void {
    this.headers = [];
    Object.entries(headerObject).forEach((item) => {
      const [key, value] = item;
      if (typeof value === 'string') {
        this.headers.push(new Header(key, value));
      } else {
        value.forEach((value1) => {
          this.headers.push(new Header(key, value1));
        });
      }
    });
    this.url = url;
    this.arrayBuffer = buffer;
    this.responseTime = endTime - startTime;
    this.startTime = startTime;
    this.setCharset();
    this.setChoose();
    this.getCookies()
      .map((value) => value.getCookieEntity())
      .forEach((value) => value.save());
  }

  /**
   * 设置编码方式
   * */
  private setCharset(): void {
    const value = this.headers
      .find((value) => value.key === 'content-type' || value.key === 'Content-Type')
      ?.value?.match(/charset=(?<name>[^;]+)(;|$)/)?.groups?.name;
    this.charset = value ?? 'utf8';
  }

  /**
   * 设置 bodyChoose,textChoose
   * */
  private setChoose(): void {
    this.contentType = 'text';
    this.textType = 'plain';
    const value = this.headers
      .find((value) => value.key === 'content-type' || value.key === 'Content-Type')
      ?.value?.split(';')?.[0];
    if (value?.includes('json') || value?.includes('text')) {
      this.contentType = 'text';
      if (value.includes('json')) {
        this.textType = 'json';
      } else if (value.includes('xml')) {
        this.textType = 'xml';
      } else if (value.includes('html')) {
        this.textType = 'html';
      } else if (value.includes('css')) {
        this.textType = 'css';
      } else if (value.includes('javascript')) {
        this.textType = 'javascript';
      } else {
        this.textType = 'plain';
      }
    } else if (value?.includes('image')) {
      this.contentType = 'image';
    }
  }

  /**
   * 获取 cookie 数据
   * */
  public getCookies(): Cookie[] {
    return this.headers
      .filter((value) => value.key === 'set-cookie')
      .map((value) => Cookie.getNewCookies(value.value, this.url, this.startTime));
  }

  /**
   * 获取返回的代码
   * */
  public getCode(): string {
    const decoder = new TextDecoder(this.charset);
    const data = decoder.decode(this.arrayBuffer);
    if (this.textType === 'json') {
      try {
        return JSON.stringify(JSON.parse(data));
      } catch {
        return data;
      }
    }
    return data;
  }
}
