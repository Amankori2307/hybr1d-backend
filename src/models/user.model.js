const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SELLER, BUYER } = require('../utils/constants');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [
            BUYER,
            SELLER
        ],
        required: true
    },
}, { timestamps: true });


UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if (err) return next(err)
        this.password = hashedPassword;
        next();
    })
})

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err)
        if (!isMatch) return cb(null, false);
        cb(null, this);
    })
}

module.exports = mongoose.model('User', UserSchema);