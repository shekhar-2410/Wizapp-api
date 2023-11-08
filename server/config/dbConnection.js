const { createPool } = require("mysql2");

const pool = createPool({
  host: "52.66.145.164",
  port: "4422",
  user: "Shekhar.wizard",
  database: "wizz_app",
  password: "Shekharwizard!123()",
  connectionLimit: 10,
});

//insert data into db
// const sqlInsert =
// "INSERT INTO contact_db (id,name,email,contact) VALUES (4,'JD','jd@gmail.com',09123467) "
// pool.query(sqlInsert, (err, res) => {
//   if (err) {
//     return console.log(err);
//   }

//   return console.log(res);
// });

// select data from db
// pool.query(`select * FROM user_info`, (err, result) => {
//   if (err) {
//     return console.log(err);
//   }
//   return console.log(result);
// });
// module.exports = pool;
