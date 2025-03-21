const Customer = require('../../domain/models/Customer');
const customerService = require('../../domain/services/customerService');

const addCustomer = async (req, res, next) => {
  try {
    const customerData = Customer.fromRequestBody(req.body);
    const newCustomer = await customerService.createCustomer(customerData);
    
    res.status(201)
      .location(`${process.env.BASE_URL}/customers/${newCustomer.id}`)
      .json(newCustomer);
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (isNaN(parseInt(id))) {
      const error = new Error('Invalid customer ID');
      error.statusCode = 400;
      throw error;
    }
    
    const customer = await customerService.getCustomerById(parseInt(id));
    
    if (!customer) {
      const error = new Error('Customer not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

const getCustomerByUserId = async (req, res, next) => {
    try {
      const { userId } = req.query;
      
      if (!userId) {
        const error = new Error('User ID is required');
        error.statusCode = 400;
        throw error;
      }
      
      // Email validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userId)) {
        const error = new Error('Invalid email format');
        error.statusCode = 400;
        throw error;
      }
      
      const customer = await customerService.getCustomerByUserId(userId);
      
      if (!customer) {
        const error = new Error('Customer not found');
        error.statusCode = 404;
        throw error;
      }
      
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  };
  

module.exports = {
  addCustomer,
  getCustomerById,
  getCustomerByUserId
};
