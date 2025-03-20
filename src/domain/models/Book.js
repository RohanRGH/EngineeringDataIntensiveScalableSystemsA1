class Book {
    constructor(ISBN, title, Author, description, genre, price, quantity) {
      this.ISBN = ISBN;
      this.title = title;
      this.Author = Author;
      this.description = description;
      this.genre = genre;
      this.price = price;
      this.quantity = quantity;
    }
  
    static fromRequestBody(body) {
      return new Book(
        body.ISBN,
        body.title,
        body.Author,
        body.description,
        body.genre,
        body.price,
        body.quantity
      );
    }
  
    toJSON() {
      return {
        ISBN: this.ISBN,
        title: this.title,
        Author: this.Author,
        description: this.description,
        genre: this.genre,
        price: this.price,
        quantity: this.quantity
      };
    }
  }
  
  module.exports = Book;
  