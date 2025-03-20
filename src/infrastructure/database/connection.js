const mysql = require('mysql2/promise');
const config = require('./config');

let pool;

const initializeDatabase = async () => {
  try {
    pool = mysql.createPool(config);
    
    // Test connection
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

const getConnection = () => {
  if (!pool) {
    throw new Error('Database not initialized');
  }
  return pool;
};

module.exports = {
  initializeDatabase,
  getConnection
};
