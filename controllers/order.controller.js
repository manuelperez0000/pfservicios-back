require('dotenv').config()
const Order = require('../models/orders.model');
const  config  = require('../config');
const responseSuccess = require('../helpers/response-success');
const responseErrors = require('../helpers/response-errors');
const   transporter = require('../helpers/nodeMailer')
const User = require('../models/users.model');

/**
 * paypal
 * {
    "id": "3HH65830D02842527",
    "intent": "CAPTURE",
    "status": "COMPLETED",
    "purchase_units": [
        {
            "reference_id": "default",
            "amount": {
                "currency_code": "USD",
                "value": "10.00"
            },
            "payee": {
                "email_address": "sb-eebwg3141742@business.example.com",
                "merchant_id": "W8HLS9HQF6BF2"
            },
            "description": "Asesoría en gestión de servidores",
            "shipping": {
                "name": {
                    "full_name": "John Doe"
                },
                "address": {
                    "address_line_1": "Free Trade Zone",
                    "admin_area_2": "Caracas",
                    "admin_area_1": "Caracas",
                    "postal_code": "1012",
                    "country_code": "VE"
                }
            },
            "payments": {
                "captures": [
                    {
                        "id": "47206377YE010752X",
                        "status": "COMPLETED",
                        "amount": {
                            "currency_code": "USD",
                            "value": "10.00"
                        },
                        "final_capture": true,
                        "seller_protection": {
                            "status": "ELIGIBLE",
                            "dispute_categories": [
                                "ITEM_NOT_RECEIVED",
                                "UNAUTHORIZED_TRANSACTION"
                            ]
                        },
                        "create_time": "2024-04-28T13:11:45Z",
                        "update_time": "2024-04-28T13:11:45Z"
                    }
                ]
            }
        }
    ],
    "payer": {
        "name": {
            "given_name": "John",
            "surname": "Doe"
        },
        "email_address": "sb-ckjua3153357@personal.example.com",
        "payer_id": "P8P8TZEU63LZG",
        "address": {
            "country_code": "VE"
        }
    },
    "create_time": "2024-04-28T13:09:29Z",
    "update_time": "2024-04-28T13:11:45Z",
    "links": [
        {
            "href": "https://api.sandbox.paypal.com/v2/checkout/orders/3HH65830D02842527",
            "rel": "self",
            "method": "GET"
        }
    ]
}
* User
{
    "username": "Juan Luis Marquez",
    "email": "juanvs23@gmail.com",
    "active": true,
    "phone": "+584248310009",
    "indentification": "15000000",
    "createdAt": "2024-04-22T02:09:07.215Z",
    "updatedAt": "2024-04-24T01:58:43.672Z",
    "role": "admin",
    "id": "6625c6c313b97d5d45429a30"
}
 */

class OrderController {
    async creaOrder(req, res) {
     
            const {accepted, amount, description, paymentMethod, user} = req.body
            const getAdmins = await User.find({ role: 'admin', active: true });

            const order = new Order({
                user,
                description,
                amount,
                paymentMethod,
                accepted,
                status:paymentMethod.paymentOrder.status === 'COMPLETED' ? 'PENDIENTE' : 'Error en el pago'
            })
           const savedOrder = await order.save();
         //  console.log(savedOrder);
            if(paymentMethod.paymentOrder.status === 'COMPLETED') {
               // console.log(getAdmins);
               
               getAdmins.forEach((admin) => {
                    const mailOptions = {
                        from: `pfservicios <${config.auth.email}>`,
                        to: `${admin.email}`,
                        subject: 'Tiene una nueva operación a revisar',
                        html: `<h3>Hola ${admin.username}</h3>
                        <p>Se ha realizado un nuevo pago,  por favor revise su orden.</p>
                        <p><b>Cliente:</b> ${user.username}</p>
                        <p><b>Correo:</b> ${user.email}</p>
                        <p><b>Monto:</b> ${savedOrder.amount}</p>
                        <p><b>Descripción:</b> ${savedOrder.description}</p>
                        <p><b>Método de pago:</b> ${paymentMethod.payment_gateway}</p>
                        <p><b>Status:</b> ${savedOrder.status}</p>
                        <p><b>ID:</b> ${paymentMethod.paymentOrder.id}</p>
                        <p><b>Correo Paypal:</b> ${paymentMethod.paymentOrder.purchase_units[0].payee.email_address}</p>
                        `,
                    }
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                           console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                })
            }
            
            return responseSuccess(res, 200, { msg: 'Orden creada', data: order });
    }
    async getOrders(req, res) {
        const orders = await Order.find();

        return responseSuccess(res, 200, { ordenes: orders, total: orders.length });
    }
    async getOrderById(req, res) {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return responseErrors(res, 404, 'orden no encontrada', null);
        }
        return responseSuccess(res, 200, { order: order });
    }

    async updateOrder(req, res) {
        
        const { id, status } = req.body;
        const order = await Order.findByIdAndUpdate({ _id: id }, { status }, { new: true });
        console.log(order);
        if (!order) {
            return responseErrors(res, 404, 'orden no encontrada', null);
        }
        return responseSuccess(res, 200, { order: order });
    }
}

module.exports = OrderController;