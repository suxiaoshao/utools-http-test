/// <reference types="react-scripts" />
import 'utools-api-types';
import * as fs from 'fs';
import form from 'form-data';
import * as path from 'path';
import { Buffer } from 'buffer';

declare global {
  interface Window {
    nodeFs: typeof fs;
    nodePath: typeof path;
  }
}
