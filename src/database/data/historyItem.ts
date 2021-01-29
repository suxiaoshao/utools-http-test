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
  const httpEntity = new HttpEntity();
  httpEntity.url = (historyItem.host ?? '') + (historyItem.path ?? '');
  httpEntity.method = historyItem.method ?? 'GET';
  httpEntity.name = name;
  httpEntity.request = getRequestEntityFromHistory(historyItem.requestHeadersData, historyItem.requestContentData);
  httpEntity.tags = tags;
  return httpEntity;
}

export function getRequestEntityFromHistory(
  headersData: OldRequestHeaders | undefined,
  contentData: OldRequestContent | undefined,
): RequestEntity {
  const requestEntity = new RequestEntity();
  requestEntity.headers = JSON.stringify(
    headersData?.headers?.map<Header>((value) => ({
      value: value.value ?? '',
      key: value.name ?? '',
    })),
  );
  requestEntity.xForms = JSON.stringify(
    contentData?.form?.map<RequestXForm>((value) => new RequestXForm(value.name ?? '', value.value ?? '')),
  );
  requestEntity.text = contentData?.text ?? '';
  requestEntity.dataForms = JSON.stringify(
    contentData?.files?.map<RequestUploadFile>(
      (value) => new RequestUploadFile(value.name ?? '', true, '', value.path ?? ''),
    ),
  );
  requestEntity.bodyChoose = 'none';
  requestEntity.textChoose = 'plain';
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
