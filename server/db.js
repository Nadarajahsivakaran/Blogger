import mysql from "mysql";

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blogger",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Database connected");
});

export default connection;
