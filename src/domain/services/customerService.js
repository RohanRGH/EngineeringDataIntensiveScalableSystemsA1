const customerRepository = require('../../infrastructure/repositories/customerRepository');
const { validateCustomer } = require('../../utils/validators');

class CustomerService {
  async getCustomerById(id) {
    return await customerRepository.findById(id);
  }

  async getCustomerByUserId(userId) {
    return await customerRepository.findByUserId(userId);
  }

  async createCustomer(customerData) {
    const validationError = validateCustomer(customerData);
    if (validationError) {
      const error = new Error(validationError);
      error.statusCode = 400;
      throw error;
    }

    const existingCustomer = await customerRepository.findByUserId(customerData.userId);
    if (existingCustomer) {
      const error = new Error('This user ID already exists in the system.');
      error.statusCode = 422;
      throw error;
    }

    return await customerRepository.create(customerData);
  }
}

module.exports = new CustomerService();
