import { getHttpEntityFromHistoryItem, HistoryItem } from './historyItem';
import { getHttpDir } from '../../util/update/localPath';
import { TagEntity } from '../entity/tag.entity';
import { CookieEntity } from '../entity/cookie.entity';
import { HttpEntity } from '../entity/http.entity';

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

export async function initData(): Promise<void> {
  const path = getHttpDir();
  const filePath = window.nodePath.resolve(path, 'old.json');
  if (!window.nodeFs.existsSync(filePath)) {
    const historyItems = window.utools.db.allDocs<HistoryItem>();
    window.nodeFs.writeFileSync(filePath, JSON.stringify(historyItems));
    const tagEntity = new TagEntity(null, '旧历史');
    tagEntity.save();
    const httpEntities = historyItems.map((value) => getHttpEntityFromHistoryItem(value.data, value._id, [tagEntity]));
    const cookieEntities = getCookieFromHistory(historyItems.map((value) => value.data));
    await Promise.all([HttpEntity.saves(httpEntities), CookieEntity.saves(cookieEntities)]);
  }
}
