const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password", // kung naka xamp gawing empty string pero advisable gumamit ng mysql workbench para isang import lang
  database: "tenant_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

db.on("error", (err) => {
  console.error("Database connection error:", err);
});

module.exports = db;
