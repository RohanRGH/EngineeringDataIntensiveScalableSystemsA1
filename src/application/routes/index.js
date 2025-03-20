const express = require('express');
const bookRoutes = require('./bookRoutes');
const customerRoutes = require('./customerRoutes');
const statusRoutes = require('./statusRoutes');

const router = express.Router();

router.use('/books', bookRoutes);
router.use('/customers', customerRoutes);
router.use('/status', statusRoutes);

module.exports = router;
