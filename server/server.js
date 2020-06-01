const express = require('express')
const bodyParser = require('body-parser');
require('./config/config');

const app = express();
const mongoose = require('mongoose');
const urlDatabase = process.env.URL_DATABASE;

mongoose.connect(urlDatabase, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) {
        throw new Error(err.message);
    }
    console.log('database connected');
})


const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/user.routes'));


app.get('/', (req, res) => res.send({
    title: "Hello Manuel"
}))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))