import { QueryResults } from 'sql.js';

/**
 * 初始化数据库的信息
 * */
export interface SqlInitMessage {
  code: 1;
  /**
   * 文件数据
   * */
  date: Uint8Array;
}

/**
 * 发送sql 给数据库执行
 * */
export interface SqlRunMessage {
  code: 2;
  /**
   * sql 字符串
   * */
  sql: string;
}

/**
 * 发送有响应的 sql 给数据库
 * */
export interface SqlRunReturnMessage {
  code: 3;
  /**
   * sql 语句
   * */
  sql: string;
  /**
   * 标记
   * */
  flag: number;
}

export type SqlMessage = SqlInitMessage | SqlRunMessage | SqlRunReturnMessage;

/**
 * 数据库所有的数据,用于 sqlData 获取数据
 * */
export interface ReturnInitMessage {
  code: 1;
  /**
   * 所有数据
   * */
  results: QueryResults[];
}

/**
 * 数据库的字节,用于保存数据库到文件
 * */
export interface ReturnSaveMessage {
  code: 2;
  /**
   * 数据库字节
   * */
  data: Uint8Array;
}

/**
 * 数据库执行后返回的数据
 * */
export interface ReturnResultsMessage {
  code: 3;
  /**
   * 数据库返回的数据
   * */
  results: QueryResults[];
  /**
   * 这个 sql 的标记
   * */
  flag: number;
}

export type ReturnMassage = ReturnInitMessage | ReturnSaveMessage | ReturnResultsMessage;
