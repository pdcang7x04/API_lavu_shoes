var express = require('express');
const { getProductFavorite, insert, removeFavoriteProduct } = require('../controller/favorite/favoriteController');
var router = express.Router();

/**
 * lấy danh sách 
 * method: get
 * url: http://localhost:3000/favorites/getpoductfavorite
 */
router.get('/getpoductfavorite/:email', async (req, res, next) => {
    try {
        const email = req.params.email
        const data = await getProductFavorite(email)
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
 * thêm 
 * method: post
 * url: http://localhost:3000/favorites/insert
 */
router.post('/insert/:email', async (req, res, next) => {
    try {
        const email = req.params.email
        const {product_id} = req.body
        const data = await insert(email, product_id)
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
 * xóa
 * method: delete
 * url: http://localhost:3000/favorites/delete
 */
router.delete('/delete/:_id', async (req, res, next) => {
    try {
        const _id = req.params._id
        const data = await removeFavoriteProduct(_id)
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
