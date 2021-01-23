import { Store } from './classStore';

export class WorkIndex extends Store<number> {
  constructor() {
    super(0);
  }
}

export const workIndex = new WorkIndex();
export const useWorkIndex = workIndex.getFunc();
