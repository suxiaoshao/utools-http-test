import { OldHeader } from './oldHeader';
import { OldCookie } from './oldCookie';

export interface OldRequestHeaders {
  headers: OldHeader[] | undefined;
  cookies: OldCookie[] | undefined;
}
