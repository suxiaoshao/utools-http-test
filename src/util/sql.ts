import sql from 'sql.js';

export function myTest(): void {
  const db = new sql.Database(
    window.nodeFs.readFileSync('C:\\Users\\Administrator\\AppData\\Roaming\\utools\\database\\http\\http.db'),
  );
  console.log(db.exec('select * from cookie'));
}
