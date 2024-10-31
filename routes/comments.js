var express = require('express');
const { getReviewByProduct, writeAReview } = require('../controller/comment/commentController');
var router = express.Router();

/**
 * lấy danh sách bình luận
 * method: get
 * url: http://localhost:3000/comments/getAllComment
 */
router.get('/getAllComment/:productId', async (req, res, next) => {
    try {
        const productId = req.params.productId
        const data = await getReviewByProduct(productId)
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
 * viết bình luận
 * method: post
 * url: http://localhost:3000/comments/writeAReview
 */
router.post('/writeAReview', async (req, res, next) => {
    try {
        const {userId, productId, orderId, content, evaluate} = req.body
        const data = await writeAReview(userId, productId, orderId, content, evaluate)
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
