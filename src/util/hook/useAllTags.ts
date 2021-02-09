import { useSqlData } from '../store/sqlStore';
import { TagEntity } from '../../database/entity/tag.entity';
import React from 'react';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 获取所有的 tag
 * */
export function useAllTags(): TagEntity[] {
  const [sqlData] = useSqlData();
  return React.useMemo<TagEntity[]>(() => {
    return sqlData.tags;
  }, [sqlData]);
}
