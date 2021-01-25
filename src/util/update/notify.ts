import { getHttpDir } from './localPath';

export type Version = '0.2.0';

export interface Setting {
  version: Version;
}

export function checkVersion(): void {
  const version = getVersion();
  if (version !== '0.2.0') {
    showUpdateInfo();
  }
}

export function getVersion(): Version {
  const path = getHttpDir();
  const settingFile = window.nodePath.resolve(path, 'setting.json');
  if (!window.nodeFs.existsSync(settingFile)) {
    const setting: Setting = {
      version: '0.2.0',
    };
    window.nodeFs.writeFileSync(settingFile, JSON.stringify(setting));
    showUpdateInfo();
    return '0.2.0';
  }
  const setting = JSON.parse(window.nodeFs.readFileSync(settingFile).toString()) as Setting;
  return setting.version;
}

export function showUpdateInfo(): void {
  console.log(111);
  console.log(window.nodeDirname);
  window.utools.createBrowserWindow('https://vuetifyjs.com/zh-Hans/getting-started/installation/#webpack-5b8988c5', {
    width: 800,
    height: 600,
    title: '更新说明',
    transparent: false,
    frame: true,
    alwaysOnTop: true,
  });
}
