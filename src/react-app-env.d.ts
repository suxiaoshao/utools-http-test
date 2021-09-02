/// <reference types="react-scripts" />
import 'utools-api-types';
import axios from 'axios';
import * as iconv from 'iconv-lite';
import * as fs from 'fs';
import form from 'form-data';
import * as path from 'path';
import { Buffer } from 'buffer';

declare global {
  interface Window {
    axios: typeof axios;
    iconv: typeof iconv;
    nodeFs: typeof fs;
    formData: typeof form;
    nodePath: typeof path;
    buffer: typeof Buffer;
    nodeDirname: string;
  }
}
