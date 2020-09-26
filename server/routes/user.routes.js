const express = require('express')
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user.model');
const { verifyToken, verifyAdminRole } = require('../middlewares/auth');


app.get('/users',verifyToken, (req, res) => {
    let {
        from,
        limit
    } = req.query;

    let conditions = {
        state: true
    }; // conditions filter in query
    let attributes = 'username email role google state'; // Select fields in query
    User.find(conditions, attributes)
        .skip(Number(from) || 0)
        .limit(Number(limit) || 5)
        .exec((err, usersRes) => {
            if (err) {
                return res.status(400)
                    .send({
                        err
                    });
            }
            User.countDocuments(conditions, (err, countRegister) => {
                return res.send({
                    ok: true,
                    users: usersRes,
                    count: countRegister
                });
            })
        });
})

app.post('/users', [verifyToken, verifyAdminRole], (req, res) => {
  let { body: userBody } = req;

  userBody.password = bcrypt.hashSync(userBody.password, 10);
  let user = new User(userBody); // parseo dinamico con el paquete body-express
  user.save((err, userRes) => {
    if (err) {
      return res.status(400).send({
        err,
      });
    }
    return res.send({
      ok: true,
      userCreated: userRes,
    });
  });
});


app.put('/users/:userId', [verifyToken, verifyAdminRole], (req, res) => {
  let { userId } = req.params;
  let { body: userBody } = req;

  userBody = _.pick(userBody, ['username', 'email', 'img', 'role', 'estadp']);
  let options = {
    new: true,
    runValidators: true,
  };
  User.findByIdAndUpdate(userId, userBody, options, (err, userRes) => {
    if (err) {
      return res.status(400).send({
        err,
      });
    }
    return res.send({
      ok: true,
      userUpdated: userRes,
    });
  });
});

app.delete('/users/:userId', [verifyToken, verifyAdminRole], (req, res) => {
  let { userId } = req.params;

  //User.findByIdAndRemove(userId, (err, userRemove) => {
  let changeState = {
    state: false,
  };
  let options = {
    new: true,
    //runValidators: true
  };
  User.findByIdAndUpdate(userId, changeState, options, (err, userRemove) => {
    if (err) {
      return res.status(400).send({
        err,
      });
    }
    if (!userRemove) {
      return res.status(400).send({
        err: {
          message: 'user not found',
        },
      });
    }
    return res.send({
      ok: true,
      userRemoved: userRemove,
    });
  });
});

module.exports = app;