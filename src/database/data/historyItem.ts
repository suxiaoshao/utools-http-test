import { OldRequestHeaders } from './oldRequestHeaders';
import { OldRequestContent } from './oldRequestContent';
import { HttpEntity } from '../entity/http.entity';
import { RequestEntity } from '../entity/request.entity';
import { Header } from '../../util/http/header';
import { RequestXForm } from '../../util/http/requestXForm';
import { RequestUploadFile } from '../../util/http/requestUploadFile';
import { TagEntity } from '../entity/tag.entity';
import { MyMethod } from '../../util/http/httpManager';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @interface
 * @description 保存再 utools 中的数据
 * */
export interface HistoryItem {
  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description url 的 host 部分
   * */
  host: string | undefined;
  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description http 方法
   * */
  method: MyMethod | undefined;
  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description url 的 path 部分
   * */
  path: string | undefined;
  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description request 的头部和 cookies 部分
   * */
  requestHeadersData: OldRequestHeaders | undefined;
  /**
   * @author sushao
   * @version 0.2.2
   * @since 0.2.2
   * @description request 的 data部分
   * */
  requestContentData: OldRequestContent | undefined;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 从 HistoryItem 中获取 HttpEntity
 * @param historyItem {HistoryItem} utools.db 中的 data 部分
 * @param name utools.db 中的 _id 部分
 * @param tags httpEntity 的标签
 * */
export function getHttpEntityFromHistoryItem(historyItem: HistoryItem, name: string, tags: TagEntity[]): HttpEntity {
  return new HttpEntity(
    null,
    (historyItem.host ?? '') + (historyItem.path ?? ''),
    name,
    historyItem.method ?? 'GET',
    getRequestEntityFromHistory(historyItem.requestHeadersData, historyItem.requestContentData),
    tags,
  );
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 从 HistoryItem 中的 requestHeadersData,requestContentData
 * 两个部分获取 RequestEntity
 * @param headersData 头部和 cookies信息
 * @param contentData request data 部分信息
 * */
export function getRequestEntityFromHistory(
  headersData: OldRequestHeaders | undefined,
  contentData: OldRequestContent | undefined,
): RequestEntity {
  const requestEntity = new RequestEntity(
    null,
    'none',
    'plain',
    contentData?.text ?? '',
    JSON.stringify(
      contentData?.files?.map<RequestUploadFile>(
        (value) => new RequestUploadFile(value.name ?? '', true, '', value.path ?? ''),
      ),
    ),
    JSON.stringify(
      contentData?.form?.map<RequestXForm>((value) => new RequestXForm(value.name ?? '', value.value ?? '')),
    ),
    JSON.stringify(
      headersData?.headers?.map<Header>((value) => ({
        value: value.value ?? '',
        key: value.name ?? '',
      })),
    ),
  );
  switch (contentData?.choose) {
    case 'json':
      requestEntity.bodyChoose = 'text';
      requestEntity.textChoose = 'plain';
      break;
    case 'files':
      requestEntity.bodyChoose = 'form-data';
      break;
    case 'text':
      requestEntity.bodyChoose = 'text';
      break;
    case 'form':
      requestEntity.bodyChoose = 'x-www-form-urlencoded';
      break;
    case 'empty':
      break;
    case undefined:
      break;
  }
  return requestEntity;
}
