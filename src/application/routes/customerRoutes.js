const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

router.post('/', customerController.addCustomer);
router.get('/:id', customerController.getCustomerById);
router.get('/', customerController.getCustomerByUserId);

module.exports = router;
