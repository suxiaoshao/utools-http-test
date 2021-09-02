import { Store } from './classStore';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 被激活的下标
 * */
export class WorkIndex extends Store<number> {
  constructor() {
    super(0);
  }
}

export const workIndex = new WorkIndex();
export const useWorkIndex = workIndex.getFunc();
