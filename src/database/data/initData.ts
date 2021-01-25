import { getHttpEntityFromHistoryItem, HistoryItem } from './historyItem';
import { getHttpDir } from '../../util/update/localPath';
import { TagMapper } from '../mapper/tagMapper';
import { TagEntity } from '../entity/tag.entity';
import { CookieEntity } from '../entity/cookie.entity';
import { HttpMapper } from '../mapper/httpMapper';
import { CookieMapper } from '../mapper/cookieMapper';

function getCookieFromHistory(historyItems: HistoryItem[]): CookieEntity[] {
  const cookieEntities: CookieEntity[] = [];
  historyItems.forEach((value) => {
    value.requestHeadersData?.cookies?.forEach((value1) => {
      const cookieEntity = new CookieEntity();
      cookieEntity.value = value1.value ?? '';
      cookieEntity.name = value1.name ?? '';
      cookieEntity.path = value1.path ?? '';
      cookieEntity.domain = value1.domain ?? '';
      cookieEntity.expires = null;
      if (value1.maxAge && value1.maxAge.use && typeof value1.maxAge.value === 'number') {
        cookieEntity.maxAge = value1.maxAge.value;
      } else {
        cookieEntity.maxAge = null;
      }
      cookieEntity.createTime = value1.creatTime !== undefined ? value1.creatTime * 1000 : Date.now();
      cookieEntities.push(cookieEntity);
    });
  });
  return cookieEntities;
}

export async function initData(): Promise<void> {
  const path = getHttpDir();
  const filePath = window.nodePath.resolve(path, 'old.json');
  if (!window.nodeFs.existsSync(filePath)) {
    const historyItems = window.utools.db.allDocs<HistoryItem>();
    window.nodeFs.writeFileSync(filePath, JSON.stringify(historyItems));
    const tagEntity = new TagEntity();
    tagEntity.tagName = '旧历史';
    const tags = await TagMapper.saveTags(tagEntity);
    const httpEntities = historyItems.map((value) => getHttpEntityFromHistoryItem(value.data, value._id, [tags]));
    const cookieEntities = getCookieFromHistory(historyItems.map((value) => value.data));
    await HttpMapper.saveHttps(httpEntities);
    await CookieMapper.saveCookies(cookieEntities);
  }
}
