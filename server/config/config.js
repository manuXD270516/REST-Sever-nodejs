// Puerto
process.env.PORT = process.env.PORT || 3007;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
console.log(process.env.NODE_ENV);
let url = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/cafe-nodejs' : process.env.MONGO_URI_DATABASE;

process.env.URL_DATABASE = url;

