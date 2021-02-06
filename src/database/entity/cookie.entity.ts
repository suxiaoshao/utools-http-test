import { sqlWorker } from '../mapper/sql.main';
import { SqlRunMessage } from '../mapper/sql.interface';
import { Cookie } from '../../util/http/cookie';

export interface CookieProp {
  domain: string;
  path: string;
  name: string;
  value: string;
  createTime: number;
  maxAge: number | null;
  expires: string | null;
}

export class CookieEntity {
  domain: string;
  path: string;
  name: string;
  value: string;
  createTime: number;
  maxAge: number | null;
  expires: Date | null;

  constructor(
    domain: string,
    path: string,
    name: string,
    value: string,
    createTime: number,
    maxAge: number | null,
    expires: Date | null,
  ) {
    this.createTime = createTime;
    this.path = path;
    this.domain = domain;
    this.maxAge = maxAge;
    this.name = name;
    this.value = value;
    this.expires = expires;
  }

  public static from(cookieProp: CookieProp): CookieEntity {
    return new CookieEntity(
      cookieProp.domain,
      cookieProp.path,
      cookieProp.name,
      cookieProp.value,
      cookieProp.createTime,
      cookieProp.maxAge,
      cookieProp.expires ? new Date(cookieProp.expires) : null,
    );
  }

  public clone(): CookieEntity {
    return new CookieEntity(this.domain, this.path, this.name, this.value, this.createTime, this.maxAge, this.expires);
  }

  public delete(): void {
    const message: SqlRunMessage = {
      code: 2,
      sql: `delete from cookie where name = '${this.name}' and domain = '${this.domain}' and path = '${this.path}'`,
    };
    sqlWorker.postMessage(message);
  }

  public toCookie(): Cookie {
    return new Cookie(this.name, this.value, this.domain, this.path, this.createTime, this.maxAge, this.expires);
  }

  public save(): void {
    this.delete();
    const message: SqlRunMessage = {
      code: 2,
      sql: `insert into cookie(domain, path, name, value, createTime, maxAge, expires)
            VALUES ('${this.domain}', '${this.path}', '${this.name}', '${this.value}', ${this.createTime}, ${
        this.maxAge
      }, ${this.expires ? `'${this.expires.toISOString()}'` : null});`,
    };
    sqlWorker.postMessage(message);
  }

  public static async saves(cookieEntities: CookieEntity[]): Promise<void> {
    for (const cookieEntity of cookieEntities) {
      await cookieEntity.save();
    }
  }
}
