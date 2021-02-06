import { CookieEntity } from '../../database/entity/cookie.entity';

export class Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  creatTime: number;
  maxAge: number | null;
  expires: Date | null;

  constructor(
    name: string,
    value: string,
    domain: string,
    path: string,
    createTime: number,
    maxAge: number | null,
    expires: Date | null,
  ) {
    this.creatTime = createTime;
    this.expires = expires;
    this.domain = domain;
    this.value = value;
    this.name = name;
    this.maxAge = maxAge;
    this.path = path;
  }

  static getNewCookies(setCookieContent: string, url: string, createTime: number): Cookie {
    const cookieKV = setCookieContent
      .split(/; ?/)
      .map((value) => {
        const match = value.match(/^(?<name>[^=]+)=(?<value>[^=]+)$/);
        return {
          value: match?.groups?.value,
          name: match?.groups?.name,
        };
      })
      .filter((value) => value.value !== undefined && value.name !== undefined) as { value: string; name: string }[];
    const match = url.split('?')[0].match(/https?:\/\/(?<domain>[^/]+)(?<path>\/.+)$/);
    let domain: string = match?.groups?.domain ?? '';
    let maxAge: number | null = null;
    let path: string = match?.groups?.path ?? '/';
    let expires: null | Date = null;
    const value = cookieKV[0].value;
    const name = cookieKV[0].name;
    cookieKV.forEach((value1) => {
      switch (value1.name) {
        case 'Expires':
          expires = new Date(Date.parse(value1.value));
          break;
        case 'Max-Age':
          maxAge = parseInt(value1.value);
          break;
        case 'Domain':
          domain = value1.value;
          break;
        case 'Path':
          path = value1.value;
          break;
        case 'expires':
          expires = new Date(Date.parse(value1.value));
          break;
        case 'max-age':
          maxAge = parseInt(value1.value);
          break;
        case 'domain':
          domain = value1.value;
          break;
        case 'path':
          path = value1.value;
          break;
      }
    });
    return new Cookie(name, value, domain, path, createTime, maxAge, expires);
  }

  static getCookieByCookieEntity(cookieEntity: CookieEntity): Cookie | undefined {
    if (
      cookieEntity.domain !== undefined &&
      cookieEntity.value !== undefined &&
      cookieEntity.path !== undefined &&
      cookieEntity.name !== undefined &&
      cookieEntity.expires !== undefined &&
      cookieEntity.maxAge !== undefined &&
      cookieEntity.createTime !== undefined
    ) {
      return new Cookie(
        cookieEntity.name,
        cookieEntity.value,
        cookieEntity.domain,
        cookieEntity.path,
        cookieEntity.createTime,
        cookieEntity.maxAge,
        cookieEntity.expires,
      );
    }
  }

  public getCookieEntity(): CookieEntity {
    return new CookieEntity(this.domain, this.path, this.name, this.value, this.creatTime, this.maxAge, this.expires);
  }

  public clone(): Cookie {
    return new Cookie(this.name, this.value, this.domain, this.path, this.creatTime, this.maxAge, this.expires);
  }

  public check(): boolean {
    return this.domain !== '' && this.name !== '' && this.path.match(/^\//) !== null && this.value !== '';
  }
}
