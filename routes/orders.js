var express = require('express');
const { create, getHistoryShopping, getOrder, updateStatusOrder, getSalesAnhPurchase, getOrderSummary } = require('../controller/order/orderController');
const orderModel = require('../controller/order/orderModel');
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
        const { user, paymentmethod, totalAmount, paymentStatus, product } = req.body
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

/**
 * lấy dánh sách đơn hàng
 * method: get
 * url: http://localhost:3000/orders/getOrder

 */

router.get('/getOrder', async (req, res, next) => {
    try {
        let page = req.query.page
        let limit = req.query.limit
        let keywords = req.query.keywords

        const data = await getOrder(page, limit, keywords)

        if (data) {
            return res.status(200).json({ status: true, data: data });
        } else {
            return res.status(400).json({ status: false });
        }
    } catch (error) {
        console.error('Lỗi khi lấy người dùng:', error.message);
        return res.status(500).json({ status: false, error: error.message });
    }
});

/**
 * lấy dánh sách tất cả đơn hàng
 * method: get
 * url: http://localhost:3000/orders/getAllOrder

 */

router.get('/getAllOrder', async (req, res, next) => {
    try {
        

        const data = await orderModel.find({})
        if (data) {
            return res.status(200).json({ status: true, data: data });
        } else {
            return res.status(400).json({ status: false });
        }
    } catch (error) {
        console.error('Lỗi khi lấy người dùng:', error.message);
        return res.status(500).json({ status: false, error: error.message });
    }
});


/**
 * cập nhật trạng thái
 * method: get
 * url: http://localhost:3000/orders/updateStatusOrder

 */
router.put('/updateStatusOrder/:_id', async (req, res, next) => {
    try {
        const _id = req.params._id
        const paymentStatus = req.body.paymentStatus
        const data = await updateStatusOrder(_id, paymentStatus)

        if (data) {
            return res.status(200).json({ status: true, data: data });
        } else {
            return res.status(400).json({ status: false });
        }
    } catch (error) {
        console.error('Lỗi khi lấy người dùng:', error.message);
        return res.status(500).json({ status: false, error: error.message });
    }
});

/**
 * thống kê số lượng mua và bán
 * method: get
 * url: http://localhost:3000/orders/getSalesAnhPurchase

 */
router.get('/getSalesAnhPurchase', async (req, res, next) => {
    try {
        

        const data = await getSalesAnhPurchase()
        if (data) {
            return res.status(200).json({ status: true, data: data });
        } else {
            return res.status(400).json({ status: false });
        }
    } catch (error) {
        console.error('Lỗi khi lấy người dùng:', error.message);
        return res.status(500).json({ status: false, error: error.message });
    }
});

/**
 * thống kê tình trạng đặt hàng
 * method: get
 * url: http://localhost:3000/orders/getOrderSummary

 */
router.get('/getOrderSummary', async (req, res, next) => {
    try {
        

        const data = await getOrderSummary()
        if (data) {
            return res.status(200).json({ status: true, data: data });
        } else {
            return res.status(400).json({ status: false });
        }
    } catch (error) {
        console.error('Lỗi khi lấy người dùng:', error.message);
        return res.status(500).json({ status: false, error: error.message });
    }
});




module.exports = router;
