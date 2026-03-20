const connectDB = require("./config/db");
const {
  addBook,
  getAllBooks,
  getBookByISBN,
  updateBookPrice,
  deleteBook,
} = require("./controllers/bookController");
const Book = require("./models/Book");

const printHeader = (step, title) => {
  console.log("\n" + "=".repeat(50));
  console.log(`  STEP ${step}: ${title}`);
  console.log("=".repeat(50));
};

const main = async () => {
  printHeader(1, "CONNECTING TO DATABASE");
  await connectDB();
  console.log("Connected. Proceeding...");
  await Book.deleteMany({});
  console.log("Cleared existing books for a fresh demo");
  printHeader(2, "ADDING SAMPLE BOOKS");

  const book1 = await addBook({
    title: "1984",
    author: "George Orwell",
    ISBN: "978-0451524935",
    publishedYear: 1949,
    genre: "dystopia",
    price: 12.99,
    inStock: true,
  });

  const book2 = await addBook({
    title: "Brave New World",
    author: "Aldous Huxley",
    ISBN: "978-0060850524",
    publishedYear: 1932,
    genre: "sci-fi",
    price: 10.99,
    inStock: true,
  });

  const book3 = await addBook({
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    ISBN: "978-1451673319",
    publishedYear: 1953,
    genre: "dystopia",
    price: 9.99,
    inStock: false,
  });

  console.log("\nSummary of books added:");
  console.log(`   1. "${book1.title}" - ISBN: ${book1.ISBN} - $${book1.price}`);
  console.log(`   2. "${book2.title}" - ISBN: ${book2.ISBN} - $${book2.price}`);
  console.log(`   3. "${book3.title}" - ISBN: ${book3.ISBN} - $${book3.price}`);

  printHeader(3, "QUERYING ALL BOOKS");
  const allBooks = await getAllBooks();

  console.log("\nFull details:");
  allBooks.forEach((b, i) => {
    console.log(
      `   ${i + 1}. Title    : ${b.title}\n` +
      `      Author  : ${b.author}\n` +
      `      ISBN    : ${b.ISBN}\n` +
      `      Year    : ${b.publishedYear}\n` +
      `      Genre   : ${b.genre}\n` +
      `      Price   : $${b.price}\n` +
      `      In Stock: ${b.inStock ? "Yes" : "No"}\n`
    );
  }); // ✅ This closing was missing!

  printHeader(4, "UPDATING A BOOK'S PRICE");
  const targetISBN = "978-0451524935";
  const newPrice = 15.99;

  console.log(`Updating "${book1.title}"...`);
  console.log(`   Old price: $${book1.price}`);

  const updatedBook = await updateBookPrice(targetISBN, newPrice);
  console.log(`   New price: $${updatedBook.price}`);
  console.log(`Price updated successfully`);

  printHeader(5, "DELETING A BOOK");
  const deleteISBN = "978-0060850524";
  console.log(`Deleting "${book2.title}" (ISBN: ${deleteISBN})...`);
  await deleteBook(deleteISBN);

  printHeader(6, "FINAL RESULTS");
  const finalBooks = await getAllBooks();

  console.log("\nRemaining books in the database:");
  finalBooks.forEach((b, i) => {
    console.log(
      `   ${i + 1}. "${b.title}" by ${b.author}\n` +
      `      Price   : $${b.price}\n` +
      `      In Stock: ${b.inStock ? "Yes" : "No"}\n`
    );
  });

  console.log("=".repeat(50));
  console.log("  ALL OPERATIONS COMPLETED SUCCESSFULLY");
  console.log("=".repeat(50) + "\n");

  process.exit(0);
};

main();

  