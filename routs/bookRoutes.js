const express = require("express");
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookByISBN,
  updateBookPrice,
  deleteBook,
} = require("../controllers/bookController");

router.get("/",           async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:isbn",      async (req, res) => {
  try {
    const book = await getBookByISBN(req.params.isbn);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/",          async (req, res) => {
  try {
    const book = await addBook(req.body);
    res.status(201).json(book);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put("/:isbn",      async (req, res) => {
  try {
    const updated = await updateBookPrice(req.params.isbn, req.body.price);
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/:isbn",   async (req, res) => {
  try {
    const deleted = await deleteBook(req.params.isbn);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
module.exports = router;

