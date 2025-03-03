const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'walletapp'
  });
  connection.connect((error) => {
      if (error) {
        console.error('Error connecting to database:', error);
        return;
      }
      console.log('Connected to database');
    });

    module.exports = connection;