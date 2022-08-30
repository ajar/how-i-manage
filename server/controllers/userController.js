const { redirect } = require("express/lib/response");
const mysql = require("mysql");

//connection
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//View users
exports.view((req, res) => {
  

pool.getConnection((err, connection) => {
  if (err) throw err; //not connected
  console.log("Connected as ID" + connection.threadId);
});

//user connection
connection.query('SELECT * FROM user', (err, rows) => {
  //when finished, release
  connection.release();

  if(!err) {
    redirect.render('main', { rows });
  } else {
    console.log(err);
  }

  console.log('Data from user table: \n', rows);
});

});
