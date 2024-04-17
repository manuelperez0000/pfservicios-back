const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    token: { type: String },
    paymentEmail: { type: String },
});

userSchema.methods.toJSON = function () {
    const { __v, _id, password, ...user } = this.toObject();
    user.id = _id;
    return user
}

module.exports = model('User', userSchema)