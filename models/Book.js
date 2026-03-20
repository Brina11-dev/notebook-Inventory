const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    required: true,
    unique: true
  },
  publishedYear: {
    type: Number
  },
  genre: {
    type: String
  },
  price: {
    type: Number,
    min: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

