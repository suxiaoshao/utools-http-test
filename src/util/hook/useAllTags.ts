import { useSqlData } from '../store/sqlStore';
import { TagEntity } from '../../database/entity/tag.entity';
import React from 'react';

export function useAllTags(): TagEntity[] {
  const [sqlData] = useSqlData();
  const allTags = React.useMemo<TagEntity[]>(() => {
    return sqlData.tags;
  }, [sqlData]);
  return allTags;
}
