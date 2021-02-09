import { getHttpEntityFromHistoryItem, HistoryItem } from './historyItem';
import { getHttpDir } from '../../util/update/localPath';
import { TagEntity } from '../entity/tag.entity';
import { CookieEntity } from '../entity/cookie.entity';
import { HttpEntity } from '../entity/http.entity';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 把 HistoryItem[] 类型转化为 CookieEntity[] 类型
 * @param {HistoryItem[]} historyItems 需要转换的 HistoryItem[]
 * @return {CookieEntity[]} 转换后的 CookieEntity[]
 * */
function getCookieFromHistory(historyItems: HistoryItem[]): CookieEntity[] {
  const cookieEntities: CookieEntity[] = [];
  historyItems.forEach((value) => {
    value.requestHeadersData?.cookies?.forEach((value1) => {
      const cookieEntity = new CookieEntity(
        value1.domain ?? '',
        value1.path ?? '',
        value1.name ?? '',
        value1.value ?? '',
        value1.creatTime !== undefined ? value1.creatTime * 1000 : Date.now(),
        value1.maxAge && value1.maxAge.use && typeof value1.maxAge.value === 'number' ? value1.maxAge.value : null,
        null,
      );
      cookieEntities.push(cookieEntity);
    });
  });
  return cookieEntities;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 如果不存在 old.json 的话,从 utools.db 中读取 0.2.0 之前的数据并保存到现在的数据库中
 * 并把数据储存在 old.json 中
 * @return {Promise<void>}
 * */
export async function initDataFromUtoolsDB(): Promise<void> {
  const path = getHttpDir();
  const filePath = window.nodePath.resolve(path, 'old.json');
  if (!window.nodeFs.existsSync(filePath)) {
    const historyItems = window.utools.db.allDocs<HistoryItem>();
    window.nodeFs.writeFileSync(filePath, JSON.stringify(historyItems));
    const tagEntity = new TagEntity(null, '旧历史');
    await tagEntity.save();
    const httpEntities = historyItems.map((value) => getHttpEntityFromHistoryItem(value.data, value._id, [tagEntity]));
    const cookieEntities = getCookieFromHistory(historyItems.map((value) => value.data));
    await Promise.all([HttpEntity.saves(httpEntities), CookieEntity.saves(cookieEntities)]);
  }
}
