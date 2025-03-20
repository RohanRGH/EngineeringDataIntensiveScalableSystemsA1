const bookRepository = require('../../infrastructure/repositories/bookRepository');
const { validateBook } = require('../../utils/validators');

class BookService {
  async getBookByISBN(ISBN) {
    return await bookRepository.findByISBN(ISBN);
  }

  async createBook(bookData) {
    const validationError = validateBook(bookData);
    if (validationError) {
      const error = new Error(validationError);
      error.statusCode = 400;
      throw error;
    }

    const existingBook = await bookRepository.findByISBN(bookData.ISBN);
    if (existingBook) {
      const error = new Error('This ISBN already exists in the system.');
      error.statusCode = 422;
      throw error;
    }

    return await bookRepository.create(bookData);
  }

  async updateBook(ISBN, bookData) {
    const validationError = validateBook(bookData);
    if (validationError) {
      const error = new Error(validationError);
      error.statusCode = 400;
      throw error;
    }

    if (ISBN !== bookData.ISBN) {
      const error = new Error('ISBN in path must match ISBN in body');
      error.statusCode = 400;
      throw error;
    }

    const existingBook = await bookRepository.findByISBN(ISBN);
    if (!existingBook) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      throw error;
    }

    return await bookRepository.update(bookData);
  }
}

module.exports = new BookService();
