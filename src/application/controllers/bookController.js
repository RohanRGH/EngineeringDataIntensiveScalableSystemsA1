const Book = require('../../domain/models/Book');
const bookService = require('../../domain/services/bookService');

const addBook = async (req, res, next) => {
  try {
    const bookData = Book.fromRequestBody(req.body);
    const newBook = await bookService.createBook(bookData);
    
    res.status(201)
      .location(`${process.env.BASE_URL}/books/${newBook.ISBN}`)
      .json(newBook);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { ISBN } = req.params;
    const bookData = Book.fromRequestBody(req.body);
    
    const updatedBook = await bookService.updateBook(ISBN, bookData);
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

const getBookByISBN = async (req, res, next) => {
  try {
    const { ISBN } = req.params;
    const book = await bookService.getBookByISBN(ISBN);
    
    if (!book) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBook,
  updateBook,
  getBookByISBN
};
