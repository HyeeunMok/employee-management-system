const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('server/repo/plexxis.db');

const tableCheckQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='employees';`;
const createTableQuery = `CREATE TABLE IF NOT EXISTS employees(
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name VARCHAR(255) NOT NULL, 
  code VARCHAR(255) NULL, 
  profession VARCHAR(255) NOT NULL, 
  color VARCHAR(255) NOT NULL, 
  city VARCHAR(255) NOT NULL, 
  branch VARCHAR(255) NOT NULL, 
  assigned BOOLEAN DEFAULT NULL);`;
// const insertQuery = `INSERT INTO employees (name, code, profession, color, city, branch, assigned) VALUES (?,?,?,?,?,?,?);`;

db.all(tableCheckQuery, function(err, rows) {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Length of rows is: ', rows.length);
  if (!rows.length) {
    db.run(createTableQuery);
    console.log("'Employees' table is Successfully created.");
    // }
  } else {
    // ---- This is for testing ---- //
    // db.run(insertQuery, [
    //   'Hyeeun',
    //   'F300',
    //   'Full Stack Developer',
    //   'Yellow',
    //   'Toronto',
    //   'High Park',
    //   false,
    // ]);
  }
});

module.exports = db;
