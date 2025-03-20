const { getConnection } = require('../database/connection');
const Customer = require('../../domain/models/Customer');

class CustomerRepository {
  async findById(id) {
    const pool = getConnection();
    const [rows] = await pool.query('SELECT * FROM customers WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return null;
    }
    
    const customer = rows[0];
    return new Customer(
      customer.id,
      customer.userId,
      customer.name,
      customer.phone,
      customer.address,
      customer.address2,
      customer.city,
      customer.state,
      customer.zipcode
    );
  }

  async findByUserId(userId) {
    const pool = getConnection();
    const [rows] = await pool.query('SELECT * FROM customers WHERE userId = ?', [userId]);
    
    if (rows.length === 0) {
      return null;
    }
    
    const customer = rows[0];
    return new Customer(
      customer.id,
      customer.userId,
      customer.name,
      customer.phone,
      customer.address,
      customer.address2,
      customer.city,
      customer.state,
      customer.zipcode
    );
  }

  async create(customer) {
    const pool = getConnection();
    const [result] = await pool.query(
      'INSERT INTO customers (userId, name, phone, address, address2, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [customer.userId, customer.name, customer.phone, customer.address, customer.address2, customer.city, customer.state, customer.zipcode]
    );
    
    customer.id = result.insertId;
    return customer;
  }
}

module.exports = new CustomerRepository();
