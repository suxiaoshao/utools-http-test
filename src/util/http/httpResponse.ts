import { Header } from './header';
import { Buffer } from 'buffer';
import { Cookie } from './cookie';
import { CookieMapper } from '../../database/mapper/cookieMapper';

export type ResponseContentType = 'text' | 'image' | 'none' | 'error';
export type ResponseTextType = 'plain' | 'json' | 'xml' | 'html' | 'css' | 'javascript';

export interface AxiosHeaderObject {
  [key: string]: string | string[];
}

export class HttpResponse {
  contentType: ResponseContentType;
  charset: string;
  buffer: Buffer;
  headers: Header[];
  responseTime: number;
  responseStatus: number;
  textType: ResponseTextType;
  url: string;
  startTime: number;

  constructor(
    contentType: ResponseContentType,
    charset: string,
    buffer: Buffer,
    headers: Header[],
    responseTime: number,
    responseStatus: number,
    textType: ResponseTextType,
    url: string,
    startTime: number,
  ) {
    this.contentType = contentType;
    this.charset = charset;
    this.buffer = buffer;
    this.headers = headers;
    this.responseStatus = responseStatus;
    this.responseTime = responseTime;
    this.textType = textType;
    this.url = url;
    this.startTime = startTime;
  }

  static getNewResponseContent(): HttpResponse {
    return new HttpResponse('none', 'utf-8', window.buffer.alloc(0), [], -1, -1, 'plain', '', -1);
  }

  public setData(
    headerObject: AxiosHeaderObject,
    url: string,
    buffer: Buffer,
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
    this.buffer = buffer;
    this.responseTime = endTime - startTime;
    this.startTime = startTime;
    this.setCharset();
    this.setChoose();
    CookieMapper.saveCookies(this.getCookies().map((value) => value.getCookieEntity())).catch((e) => {
      console.log(e);
    });
  }

  private setCharset(): void {
    const value = this.headers
      .find((value) => value.key === 'content-type' || value.key === 'Content-Type')
      ?.value?.match(/charset=(?<name>[^;]+)(;|$)/)?.groups?.name;
    this.charset = value ?? 'utf-8';
  }

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

  public getCookies(): Cookie[] {
    return this.headers
      .filter((value) => value.key === 'set-cookie')
      .map((value) => Cookie.getNewCookies(value.value, this.url, this.startTime));
  }

  public getCode(): string {
    if (this.textType === 'json') {
      try {
        return JSON.stringify(JSON.parse(window.iconv.decode(this.buffer, this.charset)));
      } catch {
        return window.iconv.decode(this.buffer, this.charset);
      }
    }
    return window.iconv.decode(this.buffer, this.charset);
  }
}
