export interface UploadFileProps {
  path: string | null;
  key: string;
  isFile: boolean;
  value: string;
}

export class RequestUploadFile implements UploadFileProps {
  path: string | null;
  key: string;
  isFile: boolean;
  value: string;

  constructor(key: string, isFile: boolean, value: string, path: string | null) {
    this.key = key;
    this.isFile = isFile;
    this.path = path;
    this.value = value;
  }

  static getNewUploadFile(): RequestUploadFile {
    return new RequestUploadFile('', false, '', null);
  }

  static formUploadFileProps(uploadFile: UploadFileProps): RequestUploadFile {
    return new RequestUploadFile(uploadFile.key, uploadFile.isFile, uploadFile.value, uploadFile.path);
  }

  public setValue(value: string): void {
    this.value = value;
    this.isFile = false;
    this.path = null;
  }

  public setPath(): void {
    const path = window.utools.showOpenDialog({
      title: '打开',
      properties: ['openFile', 'showHiddenFiles'],
    });
    this.value = '';
    this.isFile = true;
    this.path = path?.[0] ?? null;
  }

  public setIsFile(): void {
    this.value = '';
    this.isFile = true;
    this.path = null;
  }

  public setNotFile(): void {
    this.setValue('');
  }

  public getFileName(): string {
    return this.path?.match(/[\\/](?<name>[^\\/]+)$/)?.groups?.['name'] ?? '';
  }

  public getData(): string | Buffer {
    if (this.isFile && this.fileExists()) {
      return window.nodeFs.readFileSync(this.path ?? '');
    } else {
      return this.value;
    }
  }

  public fileExists(): boolean {
    return window.nodeFs.existsSync(this.path ?? '');
  }
}
