const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const connection = require('../../db');

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');

  const proceduresDir = path.join(__dirname, 'procedures');
  
  fs.readdir(proceduresDir, (err, files) => {
    if (err) {
      console.error('Error reading procedures directory:', err);
      connection.end();
      return;
    }

    files.forEach(file => {
      if (path.extname(file) === '.sql') {
        const filePath = path.join(proceduresDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');

        connection.query(sql, (error) => {
          if (error) {
            console.error(`Error creating stored procedure from ${file}:`, error);
          } else {
            console.log(`Stored procedure from ${file} created successfully`);
          }

          if (file === files[files.length - 1]) {
            connection.end();
          }
        });
      }
    });
  });
});