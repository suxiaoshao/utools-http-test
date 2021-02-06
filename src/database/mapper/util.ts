import { QueryResults } from 'sql.js';

export function readFromQueryResult<T>(queryResult: QueryResults | undefined): T[] {
  return (
    queryResult?.values?.map((value) => {
      const result: T = {} as T;
      value.forEach((value1, index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result[queryResult.columns[index]] = value1 ?? null;
      });
      return result;
    }) ?? []
  );
}
