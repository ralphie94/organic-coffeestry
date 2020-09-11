const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require("dotenv").config();

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
        if(err || !order) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        req.order = order;
        next();
    });
};

exports.create = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        console.log('ORDER IS JUST SAVED >>> ', order);
        const emailData = {
            to: 'ralphie0319@gmail.com', 
            from: 'ralphie0319@gmail.com',
            subject: `A new order is received`,
            html: `
            <h3>Hey Ralphie, Somebody just made a purchase in your store</h3>
            <p>Customer name: ${order.user.name}</p>
            <p>Customer address: ${order.address}</p>
            <p>User's purchase history: ${order.user.history.length} purchases</p>
            <p>User's email: ${order.user.email}</p>
            <p>Total products: ${order.products.length}</p>
            <p>Transaction ID: ${order.transaction_id}</p>
            <p>Order status: ${order.status}</p>
            <p>Product details:</p>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <p>Product Name: ${p.name}</p>
                        <p>Product Price: ${p.price}</p>
                        <p>Product Quantity: ${p.count}</p>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${order.amount}<h2>
            <p>Login to your dashboard</a> to see the order in detail.</p>
        `
        };
        sgMail
            .send(emailData)
            .then(sent => console.log('SENT >>>', sent))
            .catch(err => console.log('ERR >>>', err));
 
        // email to buyer
        const emailData2 = {
            to: order.user.email,
            from: 'ralphie0319@gmail.com',
            subject: `You order is in process`,
            html: `
            <h3>Hey ${req.profile.name}, Thank you for shopping with us.</h3>
            <p>Total products: ${order.products.length}</p>
            <p>Transaction ID: ${order.transaction_id}</p>
            <p>Order status: ${order.status}</p>
            <p>Product details:</p>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <p>Product Name: ${p.name}</p>
                        <p>Product Price: ${p.price}</p>
                        <p>Product Quantity: ${p.count}</p>
                </div>`;
                })
                .join('--------------------')}
            <p>Total order cost: ${order.amount}<p>
            <p>Thank your for shopping with us.</p>
        `
        };
        sgMail
            .send(emailData2)
            .then(sent => console.log('SENT 2 >>>', sent))
            .catch(err => console.log('ERR 2 >>>', err));
 
        res.json(data);
    });
};

exports.listOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name address")
        .sort("-created")
        .exec((err, orders) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};