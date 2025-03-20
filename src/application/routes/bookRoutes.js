const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('/', bookController.addBook);
router.put('/:ISBN', bookController.updateBook);
router.get('/:ISBN', bookController.getBookByISBN);
router.get('/isbn/:ISBN', bookController.getBookByISBN);

module.exports = router;
