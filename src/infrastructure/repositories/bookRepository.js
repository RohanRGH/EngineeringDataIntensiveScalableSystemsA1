const { getConnection } = require('../database/connection');
const Book = require('../../domain/models/Book');

class BookRepository {
  async findByISBN(ISBN) {
    const pool = getConnection();
    const [rows] = await pool.query('SELECT * FROM books WHERE ISBN = ?', [ISBN]);
    
    if (rows.length === 0) {
      return null;
    }
    
    const book = rows[0];
    return new Book(
      book.ISBN,
      book.title,
      book.Author,
      book.description,
      book.genre,
      book.price,
      book.quantity
    );
  }

  async create(book) {
    const pool = getConnection();
    await pool.query(
      'INSERT INTO books (ISBN, title, Author, description, genre, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [book.ISBN, book.title, book.Author, book.description, book.genre, book.price, book.quantity]
    );
    return book;
  }

  async update(book) {
    const pool = getConnection();
    await pool.query(
      'UPDATE books SET title = ?, Author = ?, description = ?, genre = ?, price = ?, quantity = ? WHERE ISBN = ?',
      [book.title, book.Author, book.description, book.genre, book.price, book.quantity, book.ISBN]
    );
    return book;
  }
}

module.exports = new BookRepository();
