export interface UploadFileProps {
  path: string | null;
  key: string;
  isFile: boolean;
  value: string;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description form-data 数据
 * */
export class RequestUploadFile implements UploadFileProps {
  /**
   * 文件地址,为 null 说明还没指定文件
   * */
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

  static formUploadFileProps(uploadFile: UploadFileProps): RequestUploadFile {
    return new RequestUploadFile(uploadFile.key, uploadFile.isFile, uploadFile.value, uploadFile.path);
  }

  /**
   * 设置 value,说明 value 是字符串
   * */
  public setValue(value: string): void {
    this.value = value;
    this.isFile = false;
    this.path = null;
  }

  /**
   * 设置文件路径,说明 value 是 文件
   * */
  public setPath(): void {
    const path = window.utools.showOpenDialog({
      title: '打开',
      properties: ['openFile', 'showHiddenFiles'],
    });
    this.value = '';
    this.isFile = true;
    this.path = path?.[0] ?? null;
  }

  /**
   * 修改 value 为文件
   * */
  public setIsFile(): void {
    this.value = '';
    this.isFile = true;
    this.path = null;
  }

  /**
   * 修改 value 为字符串
   * */
  public setNotFile(): void {
    this.setValue('');
  }

  /**
   * 获取文件名
   * */
  public getFileName(): string {
    return this.path?.match(/[\\/](?<name>[^\\/]+)$/)?.groups?.['name'] ?? '';
  }

  /**
   * 获取文件数据
   * */
  public getData(): string | Buffer {
    if (this.isFile && this.fileExists()) {
      return window.nodeFs.readFileSync(this.path ?? '');
    } else {
      return this.value;
    }
  }

  /**
   * 判断文件是否存在
   * */
  public fileExists(): boolean {
    return window.nodeFs.existsSync(this.path ?? '');
  }
}
