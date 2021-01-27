const sql = require('sql.js');
const fs = require('fs');
const fileBuffer = fs.readFileSync('C:\\Users\\Administrator\\AppData\\Roaming\\utools\\database\\http\\http.db');
const db = new sql.Database(fileBuffer);

const res = db.exec('select * from cookie');
console.log(res);
