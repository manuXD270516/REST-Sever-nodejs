// Puerto
process.env.PORT = process.env.PORT || 3007;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
let url = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/cafe-nodejs' : 'mongodb+srv://manuelnode:5DeGhj8zh@2$SJ$@cluster0-6iuza.mongodb.net/test';

process.env.URL_DATABASE = url;

