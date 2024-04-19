const { Schema, model } = require('mongoose');




const userSchema = new Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    active: { type: Boolean },
    phone: { type: String },
    indentification: { type: String },
}, { timestamps: true });


/**
 * Converts the user object to a JSON representation, excluding the __v, _id, and password fields.
 *
 * @return {Object} The user object in JSON format.
 */
userSchema.methods.toJSON = function () {
    const { __v, _id, ...user } = this.toObject();
    user.id = _id;
    return user
}

module.exports = model('User', userSchema)