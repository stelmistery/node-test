const env = require("dotenv").parse();
const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "vladeckki",
  database: "nodejs",
  password: "admin1234",
});
// тестирование подключения
pool.connect(function (err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  } else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

// закрытие подключения
pool.end(function (err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});

data = [
  { id: 2, name: "Bob", age: 27 },
  { id: 3, name: "Alice", age: "23" },
  { id: 4, name: "Adam", age: "25" },
  { id: 5, name: "John", age: "30" },
];

// function crate_defauld_db(data) {}

class DBPool {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 5,
      host: process.env.DB_HOSTNAME,
      user: process.env.DB_USER,
      database: process.env.DB_db,
      password: process.env.DB_PASS,
    });
  }

  db_default_init() {
    data = [
      { id: 2, name: "Bob", age: 27 },
      { id: 3, name: "Alice", age: "23" },
      { id: 4, name: "Adam", age: "25" },
      { id: 5, name: "John", age: "30" },
    ];

    this.pool.query();
  }
}
