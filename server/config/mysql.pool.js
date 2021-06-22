
  const mysql = require('mysql');
  const util = require('util')
  require("dotenv").config({
    path: "./config/config.env",
  });
  var pool = mysql.createPool({
    connectionLimit : process.env.MYSQL_CONNECTION_LIMIT,
    host:process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port:process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DB_NAME,
    });

    
    // Ping database to check for common exception errors.
    pool.getConnection((err, connection) => {
    if (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    
    if (connection) connection.release()
    
     return
     })
  
   pool.query = util.promisify(pool.query)
  
  
  
   module.exports = pool
    