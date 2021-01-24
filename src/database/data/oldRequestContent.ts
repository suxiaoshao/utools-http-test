import { OldUploadFile } from './oldUploadFile';
import { OldFormData } from './oldFormData';

export interface OldRequestContent {
  choose: 'empty' | 'text' | 'files' | 'json' | 'form' | undefined;
  contentType: string | undefined;
  otherContentType: string | undefined;
  text: string | undefined;
  files: OldUploadFile[] | undefined;
  form: OldFormData[] | undefined;
}
