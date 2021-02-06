import { QueryResults } from 'sql.js';

export interface SqlInitMessage {
  code: 1;
  date: Uint8Array;
}

export interface SqlRunMessage {
  code: 2;
  sql: string;
}

export interface SqlRunReturnMessage {
  code: 3;
  sql: string;
  flag: number;
}

export type SqlMessage = SqlInitMessage | SqlRunMessage | SqlRunReturnMessage;

export interface ReturnInitMessage {
  code: 1;
  results: QueryResults[];
}

export interface ReturnSaveMessage {
  code: 2;
  data: Uint8Array;
}

export interface ReturnResultsMessage {
  code: 3;
  results: QueryResults[];
  flag: number;
}

export type ReturnMassage = ReturnInitMessage | ReturnSaveMessage | ReturnResultsMessage;
