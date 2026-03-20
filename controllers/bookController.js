 const Book = require("../models/Book");

const addBook = async (bookData) => {
  try {
    const book = new Book(bookData);
    await book.save();
    console.log("Book added successfully:", book.title);
    return book;
  } catch (err) {
    console.error("Error adding book:", err.message);
    throw err;
  }
};

const getAllBooks = async () => {
  try {
    const books = await Book.find();
    console.log(`Found ${books.length} book(s)`);
    books.forEach((b) => console.log(` - ${b.title} by ${b.author} - $${b.price}`));
    return books;
  } catch (err) {
    console.error("Error retrieving books:", err.message);
    throw err;
  }
};

const getBookByISBN = async (isbn) => {
  try {
    const book = await Book.findOne({ ISBN: isbn });
    if (!book) {
      console.log(`No book found with ISBN: ${isbn}`);
      return null;
    }
    console.log(`Found: "${book.title}" by ${book.author}`);
    return book;
  } catch (err) {
    console.error("Error finding book by ISBN:", err.message);
    throw err;
  }
};

const getBooksByGenre = async (genre) => {
  try {
    const books = await Book.find({ genre: genre }).sort({ title: 1 });
    if (books.length === 0) {
      console.log(`No books found in genre: "${genre}"`);
      return [];
    }
    console.log(`Found ${books.length} book(s) in genre "${genre}":`);
    books.forEach((b) => console.log(` - ${b.title} - $${b.price}`));
    return books;
  } catch (err) {
    console.error("Error finding books by genre:", err.message);
    throw err;
  }
};

const updateBookPrice = async (isbn, newPrice) => {
  try {
    if (newPrice < 0) {
      console.error("Price cannot be negative");
      return null;
    }
    const updated = await Book.findOneAndUpdate(
      { ISBN: isbn },
      { $set: { price: newPrice } },
      { returnDocument:"after" }
    );
    if (!updated) {
      console.log(`No book found with ISBN: ${isbn}`);
      return null;
    }
    console.log(`Price updated: "${updated.title}" is now $${updated.price}`);
    return updated;
  } catch (err) {
    console.error("Error updating book price:", err.message);
    throw err;
  }
};

const deleteBook = async (isbn) => {
  try {
    const deleted = await Book.findOneAndDelete({ ISBN: isbn });
    if (!deleted) {
      console.log(`No book found with ISBN: ${isbn}`);
      return null;
    }
    console.log(`Deleted: "${deleted.title}" by ${deleted.author}`);
    return deleted;
  } catch (err) {
    console.error("Error deleting book:", err.message);
    throw err;
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBookByISBN,
  getBooksByGenre,
  updateBookPrice,
  deleteBook,
};