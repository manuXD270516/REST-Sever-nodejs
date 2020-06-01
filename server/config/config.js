// Puerto
process.env.PORT = process.env.PORT || 3007;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
console.log(process.env.NODE_ENV);
let url = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/cafe-nodejs' : 'mongodb+srv://manuelnode:5DeGhj8zh@2$SJ$@cluster0-6iuza.mongodb.net/cafe-nodejs?retryWrites=true&w=majority';

process.env.URL_DATABASE = url;

