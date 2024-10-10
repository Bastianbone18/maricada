const express = require('express');
const bodyParser = require('body-parser');
const books = require('./books'); // Importa las funciones desde books.js

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de la tienda de libros');
});

// Tarea 1: Obtener la lista de libros disponibles
app.get('/books', (req, res) => {
    res.json(books.getAllBooks());
});

// Tarea 2: Obtener los libros por ISBN
app.get('/books/:isbn', (req, res) => {
    const book = books.getBookByISBN(req.params.isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Libro no encontrado');
    }
});

// Tarea 3: Obtener todos los libros por Autor
app.get('/books/author/:author', (req, res) => {
    const result = books.getBooksByAuthor(req.params.author);
    res.json(result);
});

// Tarea 4: Obtener todos los libros en base al Título
app.get('/books/title/:title', (req, res) => {
    const result = books.getBooksByTitle(req.params.title);
    res.json(result);
});

// Tarea 5: Obtener la Reseña del libro
app.post('/books/:isbn/reviews', (req, res) => {
    const { userId, review } = req.body;
    const updatedBook = books.addOrUpdateReview(req.params.isbn, userId, review);
    res.json(updatedBook);
});

// Tarea 9: Eliminar la reseña de un libro añadida por ese usuario
app.delete('/books/:isbn/reviews', (req, res) => {
    const { userId } = req.body;
    const updatedBook = books.deleteReview(req.params.isbn, userId);
    res.json(updatedBook);
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
