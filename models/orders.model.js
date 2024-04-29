const { Schema, model } = require('mongoose');


const orderSchema = new Schema({
    user:{
        id: { type: String },
        username: { type: String },
        email: { type: String },
        phone: { type: String },
        indentification: { type: String }
    },
    amount: { type: String },
    description: { type: String },
    status: { type: String },
    paymentMethod: { 
        payment_gateway:{
            type: String
        },
        paymentOrder:{
            type: Object
        }
     },
    accepted: { type: String },
},{ timestamps: true });

orderSchema.methods.toJSON = function () {
    const { __v, _id, ...order } = this.toObject();
    order.id = _id;
    return order;
}


module.exports = model('Order',orderSchema);