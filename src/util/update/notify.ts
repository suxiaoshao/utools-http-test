import { getHttpDir } from './localPath';

export type Version = undefined | '0.2.0' | '0.2.1';

const currentVersion: Version = '0.2.1';

export interface Setting {
  version: Version;
}

/**
 * @author sushao
 * @version 0.2.1
 * @description 检查版本内容,如果本版不正确则执行版本更新时需要执行的东西
 * @since 0.2.1
 * */
export function checkVersion(): void {
  const version = getVersion();
  if (version !== currentVersion) {
    atNewVersion();
  }
}

/**
 * @author sushao
 * @description 获取版本内容,如果版本不存在则返回 undefined
 * @version 0.2.1
 * @since 0.2.1
 * @return Version 返回的版本信息
 * */
export function getVersion(): Version {
  const path = getHttpDir();
  const settingFile = window.nodePath.resolve(path, 'setting.json');
  if (!window.nodeFs.existsSync(settingFile)) {
    return undefined;
  }
  const setting = JSON.parse(window.nodeFs.readFileSync(settingFile).toString()) as Setting;
  return setting.version;
}

/**
 * @author sushao
 * @description 版本更新时需要做的事 (更新 setting.json 文件,展示更新说明)
 * @version 0.2.1
 * @since 0.2.1
 * */
export function atNewVersion(): void {
  const path = getHttpDir();
  const settingFile = window.nodePath.resolve(path, 'setting.json');
  const setting: Setting = {
    version: currentVersion,
  };
  window.nodeFs.writeFileSync(settingFile, JSON.stringify(setting));
  window.utools.createBrowserWindow('./http/http.html', {
    width: 800,
    height: 600,
    title: '更新说明',
    transparent: false,
    frame: true,
    alwaysOnTop: true,
  });
}
