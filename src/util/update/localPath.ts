/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 返回 http 的数据库文件地址,如果没有创建并返回
 * @return {string} http 插件的数据库地址
 * */
export function getDataFile(): string {
  const path = getHttpDir();
  const filePath = window.nodePath.resolve(path, 'http.db');
  if (!window.nodeFs.existsSync(filePath)) {
    window.nodeFs.writeFileSync(filePath, '');
  }
  return filePath;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 获取 http 插件的数据地址,如果没有这个地址创建并返回
 * @return {string} http数据地址
 * */
export function getHttpDir(): string {
  const fatherPath = window.nodePath.resolve(window.utools.getPath('userData'), 'database');
  if (!window.nodeFs.existsSync(fatherPath)) {
    window.nodeFs.mkdirSync(fatherPath);
  }
  const path = window.nodePath.resolve(fatherPath, 'http');
  if (!window.nodeFs.existsSync(path)) {
    window.nodeFs.mkdirSync(path);
  }
  return path;
}
