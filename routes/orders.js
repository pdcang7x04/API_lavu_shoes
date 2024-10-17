var express = require('express');
const { create } = require('../controller/order/orderController');
var router = express.Router();

/**
 * Tạo đơn hàng 
 * method: post
 * url: http://localhost:3000/orders/createOder/6700def1f0ba60d5690cd61e
{
    paymentmethod: MoMo,
    totalAmount: 4000000,
    paymentStatus: 2,
    product: 670965045ae54e74cecdd519,
    quantity: 1,
    size: 42, 
}
 */

router.post('/createOder/:user', async (req, res, next) => {
    try {
        const user = req.params.user
        const {paymentmethod, totalAmount, paymentStatus, product, quantity, size} = req.body
        const data = await create(user, paymentmethod, totalAmount, paymentStatus, product, quantity, size)
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
