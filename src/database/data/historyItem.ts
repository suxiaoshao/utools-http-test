import { OldRequestHeaders } from './oldRequestHeaders';
import { OldRequestContent } from './oldRequestContent';
import { HttpEntity } from '../entity/http.entity';
import { RequestEntity } from '../entity/request.entity';
import { Header } from '../../util/http/header';
import { RequestXForm } from '../../util/http/requestXForm';
import { RequestUploadFile } from '../../util/http/requestUploadFile';
import { TagEntity } from '../entity/tag.entity';
import { MyMethod } from '../../util/http/httpManager';

export interface HistoryItem {
  host: string | undefined;
  method: MyMethod | undefined;
  path: string | undefined;
  requestHeadersData: OldRequestHeaders | undefined;
  requestContentData: OldRequestContent | undefined;
}

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
