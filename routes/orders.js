var express = require('express');
const { create, getHistoryShopping } = require('../controller/order/orderController');
var router = express.Router();

/**
 * Tạo đơn hàng 
 * method: post
 * url: http://localhost:3000/orders/createOder
{
    paymentmethod: MoMo,
    totalAmount: 4000000,
    paymentStatus: 2,
    product: 670965045ae54e74cecdd519,
    quantity: 1,
    size: 42, 
}
 */

router.post('/createOder', async (req, res, next) => {
    try {
        const {user, paymentmethod, totalAmount, paymentStatus, product} = req.body
        const data = await create(user, paymentmethod, totalAmount, paymentStatus, product)
        if (data) {
            return res.status(200).json({ status: true, data: data });
        } else {
            return res.status(400).json({ status: false });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false, error: error.message });
    }
});

/**
 * lịch sử mua hàng
 * method: get
 * url: http://localhost:3000/orders/getHistoryShopping
{
    paymentmethod: MoMo,
    totalAmount: 4000000,
    paymentStatus: 2,
    product: 670965045ae54e74cecdd519,
    quantity: 1,
    size: 42, 
}
 */

router.get('/getHistoryShopping/:email', async (req, res, next) => {
    try {
        const email = req.params.email
        const data = await getHistoryShopping(email)
        if (data) {
            return res.status(200).json({ status: true, data: data });
        } else {
            return res.status(400).json({ status: false });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false, error: error.message });
    }
});

module.exports = router;
