const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const {
    Schema
} = mongoose;

const validRoles = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} not is valid role'
}

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email required']
    },
    password: {
        type: String,
        required: [true, 'password required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

})

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: 'expected {PATH} to be unique'
})

module.exports = mongoose.model('users', userSchema);