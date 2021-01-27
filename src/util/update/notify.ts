import { getHttpDir } from './localPath';

export type Version = undefined | '0.2.0' | '0.2.1';

const currentVersion: Version = '0.2.1';

export interface Setting {
  version: Version;
}

export function checkVersion(): void {
  const version = getVersion();
  if (version !== currentVersion) {
    atNewVersion();
  }
}

export function getVersion(): Version {
  const path = getHttpDir();
  const settingFile = window.nodePath.resolve(path, 'setting.json');
  if (!window.nodeFs.existsSync(settingFile)) {
    return undefined;
  }
  const setting = JSON.parse(window.nodeFs.readFileSync(settingFile).toString()) as Setting;
  return setting.version;
}

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
