export function getDataFile(): string {
  const fatherPath = window.nodePath.resolve(window.utools.getPath('userData'), 'database');
  if (!window.nodeFs.existsSync(fatherPath)) {
    window.nodeFs.mkdirSync(fatherPath);
  }
  const path = window.nodePath.resolve(fatherPath, 'http');
  if (!window.nodeFs.existsSync(path)) {
    window.nodeFs.mkdirSync(path);
  }
  const filePath = window.nodePath.resolve(path, 'http.db');
  if (!window.nodeFs.existsSync(filePath)) {
    window.nodeFs.writeFileSync(filePath, '');
  }
  return filePath;
}

export function getDataList(): string[] {
  return [];
}
export function getDataFileBuffer(): Uint8Array {
  const fileName = getDataFile();
  const buf = window.nodeFs.readFileSync(fileName);
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return view;
}
