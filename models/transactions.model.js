const { Schema, model } = require('mongoose');


const transactionSchema = new Schema({
    
    user: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        indentification: { type: String },
        id: { type: String },
    },
    amount: { type: Number },
    paymentMethod:{
        name: { type: String },
        id: { type: String },
        type: { type: String },
    },
    status: { type: String },
    product: { type: String },
    transactionAccepted: { type: Boolean },
},{ timestamps: true });

ransactionSchema.methods.toJSON = function () {
    const { __v, _id, ...transaction } = this.toObject();
    transaction.id = _id;
    return transaction;
}


module.exports = model('Transaction', transactionSchema);