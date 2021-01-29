import React from 'react';
import { TagEntity } from '../../database/entity/tag.entity';
import { TagMapper } from '../../database/mapper/tagMapper';
import { useAllTags } from '../store/allTags';

export function useUpdateAllTags(
  selectedTags: TagEntity[],
  onSelectedTasChanges: (newSelectedTags: TagEntity[]) => void,
): { allTags: TagEntity[]; update(): void } {
  const [allTags, setAllTags] = useAllTags();
  const update = React.useCallback(() => {
    TagMapper.getAllTags().then((value) => {
      setAllTags(value);
    });
  }, [setAllTags]);
  React.useEffect(() => {
    const newSelectedTags = selectedTags.filter((value) => allTags.some((value1) => value1.tagId === value.tagId));
    onSelectedTasChanges(newSelectedTags);
    // eslint-disable-next-line
  }, [allTags]);
  return {
    allTags,
    update,
  };
}
