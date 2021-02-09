import { Cookie } from '../../util/http/cookie';
import { execSql } from '../mapper/util';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 数据库中的原始 cookie
 * */
export interface CookieProp {
  domain: string;
  path: string;
  name: string;
  value: string;
  createTime: number;
  maxAge: number | null;
  expires: string | null;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description cookie 数据库对象
 * */
export class CookieEntity {
  domain: string;
  path: string;
  name: string;
  value: string;
  /**
   * cookie 创建时间
   * */
  createTime: number;
  /**
   * 此项为 null 时说明没有定义
   * */
  maxAge: number | null;
  /**
   * 此项为 null 说明没定义
   * */
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

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 冲数据库中原始对象获取 cookieEntity
   * */
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

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 克隆一个一样的 cookieEntity
   * */
  public clone(): CookieEntity {
    return new CookieEntity(this.domain, this.path, this.name, this.value, this.createTime, this.maxAge, this.expires);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 删除数据库中和这个匹配的 cookie
   * */
  public delete(): void {
    execSql(`delete from cookie where name = '${this.name}' and domain = '${this.domain}' and path = '${this.path}'`);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 转化为 http 中的 cookie
   * */
  public toCookie(): Cookie {
    return new Cookie(this.name, this.value, this.domain, this.path, this.createTime, this.maxAge, this.expires);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 保存这个 cookie 到数据库
   * */
  public save(): void {
    this.delete();
    execSql(`insert into cookie(domain, path, name, value, createTime, maxAge, expires)
            VALUES ('${this.domain}', '${this.path}', '${this.name}', '${this.value}', ${this.createTime}, ${
      this.maxAge
    }, ${this.expires ? `'${this.expires.toISOString()}'` : null});`);
  }

  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description 保存多个 cookies 到数据库
   * */
  public static async saves(cookieEntities: CookieEntity[]): Promise<void> {
    for (const cookieEntity of cookieEntities) {
      await cookieEntity.save();
    }
  }
}
