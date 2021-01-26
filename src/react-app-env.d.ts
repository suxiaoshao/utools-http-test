/// <reference types="react-scripts" />
import { UTools } from 'utools-helper/@types/utools';
import axios from 'axios';
import * as iconv from 'iconv-lite';
import * as fs from 'fs';
import form from 'form-data';
import * as path from 'path';
import typeorm from 'typeorm';
import { Buffer } from 'buffer';
import * as mapper from '../database/mapper';

declare global {
  interface Window {
    utools: UTools & {
      isDarkColors(): boolean;
    };
    axios: typeof axios;
    iconv: typeof iconv;
    nodeFs: typeof fs;
    formData: typeof form;
    nodePath: typeof path;
    typeorm: typeof typeorm;
    buffer: typeof Buffer;
    nodeDirname: string;
    mapper: typeof mapper;
  }
}
declare global {
  type Utools = UTools & {
    isDarkColors(): boolean;
  };
}
