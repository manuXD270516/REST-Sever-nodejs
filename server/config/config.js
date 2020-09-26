// Puerto
process.env.PORT = process.env.PORT || 3007;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
console.log(process.env.NODE_ENV);
let url =
  process.env.NODE_ENV === 'dev'
    ? 'mongodb://localhost:27017/cafe-nodejs'
    : process.env.MONGO_URI_DATABASE;

process.env.URL_DATABASE = url;

// Vencimiento del Token
process.env.EXPIRES_IN_TOKEN = process.env.EXPIRES_IN_TOKEN || 60 * 60 * 24 * 30;
console.log(process.env.EXPIRES_IN_TOKEN);

// Firma del Token
process.env.SIGN_TOKEN = process.env.SIGN_TOKEN || 'signTokenDev';
console.log(process.env.SIGN_TOKEN);
