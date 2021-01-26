import { Repository } from 'typeorm';
import { CookieEntity } from '../entity/cookie.entity';
import { Cookie } from '../../util/http/cookie';

export class CookieMapper {
  private static async getCookieRepository(): Promise<Repository<CookieEntity>> {
    return await window.mapper.getCookieRepository();
  }

  public static async saveCookies(cookieEntities: CookieEntity[]): Promise<void> {
    const cookieRepository = await this.getCookieRepository();
    const saveCookies = cookieEntities.filter((value) => {
      if (value.maxAge === null && value.expires === null) {
        return true;
      }
      if (value.maxAge === null) {
        return (value.expires?.getTime() ?? 0) >= (value.createTime ?? 0);
      }
      return (value.maxAge ?? 0) * 1000 + Date.now() >= (value.createTime ?? 0);
    });
    const deleteCookies = cookieEntities.filter((value) => !saveCookies.includes(value));
    await cookieRepository.save(saveCookies);
    await cookieRepository.remove(deleteCookies);
  }

  public static async getDomainList(): Promise<string[]> {
    await this.deleteTimeout();
    const cookieRepository = await this.getCookieRepository();
    const allData = await cookieRepository.createQueryBuilder('cookie').select('cookie.domain').getMany();
    const filterData = allData
      .map((value) => {
        return value.domain ?? '';
      })
      .filter((value) => value !== '');
    return [...new Set(filterData)];
  }

  public static async getCookieByDomain(domain: string): Promise<Cookie[]> {
    await this.deleteTimeout();
    const cookieRepository = await this.getCookieRepository();
    return (await cookieRepository.find({ domain: domain }))
      .map((value) => Cookie.getCookieByCookieEntity(value))
      .filter((value) => value !== undefined) as Cookie[];
  }

  public static async deleteCookie(cookieEntity: CookieEntity[]): Promise<void> {
    const cookieRepository = await this.getCookieRepository();
    await cookieRepository.remove(cookieEntity);
  }

  public static async deleteByDomain(domain: string): Promise<void> {
    const cookieRepository = await this.getCookieRepository();
    await cookieRepository.createQueryBuilder().delete().where('domain = :domain', { domain: domain }).execute();
  }

  public static async getCookieStrByUrl(url: string): Promise<string> {
    await this.deleteTimeout();
    const match = url.split('?')[0].match(/https?:\/\/(?<domain>[^/]+)(?<path>\/.+)$/);
    const domain = match?.groups?.domain ?? '//';
    const path = match?.groups?.path ?? '/';
    const cookieRepository = await this.getCookieRepository();
    const allData = await cookieRepository.find();
    return allData
      .filter((value) => {
        let cookieDomain = value.domain ?? '';
        const cookiePath = value.path ?? '/';
        if (cookieDomain[0] === '.') {
          cookieDomain = cookieDomain.slice(1);
        }
        return new RegExp(`${cookieDomain}$`).test(domain) && new RegExp(`^${cookiePath}`).test(path);
      })
      .map((value) => `${value.name}=${value.value}`)
      .join('; ');
  }

  private static async deleteTimeout(): Promise<void> {
    const cookieRepository = await this.getCookieRepository();
    await cookieRepository.query(
      `delete 
       from cookie
       where (maxAge IS NOT NULL and (maxAge * 1000 + cookie.createTime) < ${Date.now()})
          or (expires is not null and expires < '${new Date(Date.now()).toISOString()}');`,
    );
  }

  public static async deleteTimeoutAndSession(): Promise<void> {
    const cookieRepository = await this.getCookieRepository();
    await cookieRepository.query(
      `delete 
       from cookie
       where (maxAge IS NOT NULL and (maxAge * 1000 + cookie.createTime) < ${Date.now()})
          or (expires is not null and expires < '${new Date(
            Date.now(),
          ).toISOString()}') or(maxAge is null and expires is null);`,
    );
  }
}
