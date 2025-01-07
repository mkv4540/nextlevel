
import mysql from 'mysql2/promise';


const pool = mysql.createPool({
  host: process.env.DB_HOST, // Amazon RDS endpoint
  user: process.env.DB_USER, // RDS username
  password: process.env.DB_PASSWORD, // RDS password
  database: process.env.DB_NAME, // Your database name
  port: 3306, // Default MySQL port
});

export default pool;
