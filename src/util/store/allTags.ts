import { Store } from './classStore';
import { TagEntity } from '../../database/entity/tag.entity';
import { TagMapper } from '../../database/mapper/tagMapper';

export class AllTags extends Store<TagEntity[]> {
  constructor() {
    super([]);
    TagMapper.getAllTags().then((value) => {
      this.setData(value);
    });
  }
}

export const allTags = new AllTags();

export const useAllTags = allTags.getFunc();
