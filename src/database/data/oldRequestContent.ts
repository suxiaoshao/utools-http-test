import { OldUploadFile } from './oldUploadFile';
import { OldFormData } from './oldFormData';

export interface OldRequestContent {
  choose: 'empty' | 'text' | 'files' | 'json' | 'form';
  contentType: string;
  otherContentType: string;
  text: string;
  files: OldUploadFile[];
  form: OldFormData[];
}