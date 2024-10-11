var express = require('express');
const { getProduct, insert, update, deleteById, getProductById, dataTest } = require('../controller/product/productController');
var router = express.Router();

/**
 * data test
 * method: get
 * url: http://localhost:3000/products/datatest
 */
router.get('/datatest', async (req, res, next) => {
    try {
        const data = await dataTest()
        if (data) {
            return res.status(200).json({ status: true });
        } else {
            return res.status(400).json({ status: false });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false, error: error.message });
    }
});

/**
 * lấy danh sách thương hiệu
 * method: get
 * url: http://localhost:3000/products/getProduct
 */
router.get('/getProduct', async (req, res, next) => {
    try {
        const page = req.query.page
        const limit = req.query.limit
        const keywords = req.query.keywords
        const data = await getProduct(page, limit, keywords)
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
 * thêm sản phẩm
 * method: post
 * url: http://localhost:3000/products/insert
 */
router.post('/insert', async (req, res, next) => {
    try {
        const {name, price, currentQuantity, description, images, colors, sizes, status, brandName, category} = req.body
        const data = await insert(name, price, currentQuantity, description, images, colors, sizes, status, brandName, category)
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
 * cập nhật sản phẩm
 * method: put
 * url: http://localhost:3000/products/update/:id
 */
router.put('/update/:_id', async (req, res, next) => {
    try {
        const _id = req.params.id
        const {name, price, currentQuantity, description, image, color, size, status, brand, category} = req.body
        const data = await update(_id, name, price, currentQuantity, description, image, color, size, status, brand, category)
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
 * xóa sản phẩm
 * method: delete
 * url: http://localhost:3000/products/deleteById/:id
 */
router.delete('/deleteById/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await deleteById(id)
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
 * Tìm loại sản phẩm theo id
 * method: get
 * url: http://localhost:3000/products/getProductById/:id
 */
router.get('/getCategoryById/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await getProductById(id)
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
