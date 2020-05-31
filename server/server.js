const express = require('express')
const bodyParser = require('body-parser');
require('./config/config');

const app = express();


const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => res.send({
    title: "Hello Manuel"
}))

app.get('/users', (req, res) => {
    let users = [{
        name: "manuel"
    }, {
        name: "daniel"
    }];
    res.send(users);
})

app.post('/users', (req, res) => {
    try {
        let {
            body
        } = req;
        let {
            name
        } = req.query;
        if (!name) {
            return res.status(400)
                .send({
                    ok: false,
                    message: 'missing some parameter'
                })

        }
        res.send({
            body,
            queryParam: name
        })
    } catch (error) {

    }


})


app.put('/users/:userId', (req, res) => {
    let {
        userId
    } = req.params;
});

app.delete('/users/:userId', (req, res) => {
    let {
        userId
    } = req.params;

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))