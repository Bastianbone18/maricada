const fs = require('fs');

// Cargar libros desde un archivo JSON
let books = JSON.parse(fs.readFileSync('books.json', 'utf8'));

// Función para obtener todos los libros
const getAllBooks = () => {
    return books;
};

// Función para obtener un libro por ISBN
const getBookByISBN = (isbn) => {
    return books.find(book => book.isbn === isbn);
};

// Función para obtener libros por autor
const getBooksByAuthor = (author) => {
    return books.filter(book => book.author.toLowerCase() === author.toLowerCase());
};

// Función para obtener libros por título
const getBooksByTitle = (title) => {
    return books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
};

// Función para añadir o modificar una reseña
const addOrUpdateReview = (isbn, userId, review) => {
    const book = getBookByISBN(isbn);
    if (book) {
        const existingReviewIndex = book.reviews.findIndex(r => r.userId === userId);
        if (existingReviewIndex >= 0) {
            // Modificar reseña existente
            book.reviews[existingReviewIndex].review = review;
        } else {
            // Añadir nueva reseña
            book.reviews.push({ userId, review });
        }
        // Guardar cambios en el archivo
        saveBooks();
        return book;
    } else {
        throw new Error('Libro no encontrado');
    }
};

// Función para eliminar una reseña
const deleteReview = (isbn, userId) => {
    const book = getBookByISBN(isbn);
    if (book) {
        book.reviews = book.reviews.filter(r => r.userId !== userId);
        // Guardar cambios en el archivo
        saveBooks();
        return book;
    } else {
        throw new Error('Libro no encontrado');
    }
};

// Función para guardar los cambios en el archivo
const saveBooks = () => {
    fs.writeFileSync('books.json', JSON.stringify(books, null, 2), 'utf8');
};

module.exports = {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    addOrUpdateReview,
    deleteReview
};
[
    {
        "isbn": "978-3-16-148410-0",
        "title": "Book One",
        "author": "Author One",
        "reviews": []
    },
    {
        "isbn": "978-1-23-456789-7",
        "title": "Book Two",
        "author": "Author Two",
        "reviews": []
    }
]
