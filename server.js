const express = require("express");
const cors    = require("cors");
const dotenv  = require("dotenv");
const connectDB   = require("./config/db");
const bookRoutes  = require("./routes/bookRoutes");

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Notebook Inventory API is running" });
});

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};
start();

