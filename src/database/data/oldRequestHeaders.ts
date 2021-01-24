import { OldHeader } from './oldHeader';
import { OldCookie } from './oldCookie';

export interface OldRequestHeaders {
  headers: OldHeader[];
  cookies: OldCookie[];
}
