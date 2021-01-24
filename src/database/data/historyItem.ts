import { Method } from 'axios';
import { OldRequestHeaders } from './oldRequestHeaders';
import { OldRequestContent } from './oldRequestContent';

export interface HistoryItem {
  host: string;
  method: Method;
  path: string;
  requestHeadersData: OldRequestHeaders;
  requestContentData: OldRequestContent;
}
