// config/db.js
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "test_programming",
  port: 3307,
  connectionLimit: 5,
  supportBigInt: true, // Menambahkan properti supportBigInt
  bigIntAsNumber: true, // Menambahkan properti bigIntAsNumber
});

module.exports = pool;
