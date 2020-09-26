const express = require('express');
const app = express();

// Change prefix route for resource
app.use(require('./user.routes'));
app.use(require('./authentication.routes'));


module.exports = app;