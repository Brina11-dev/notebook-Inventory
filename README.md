# Notebook Inventory System

A full-stack web application for managing a book inventory.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose

## Features
- View all books
- Add new books
- Update book prices
- Delete books
## Setup Instructions
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with your MongoDB connection string:
MONGO_URI=your_mongodb_connection_string
PORT=5000
4. Run `node server.js`
5. Open `index.html` with Live Server

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | Get all books |
| GET | /api/books/:isbn | Get book by ISBN |
| POST | /api/books | Add new book |
| PUT | /api/books/:isbn | Update book price |
| DELETE | /api/books/:isbn | Delete book |
