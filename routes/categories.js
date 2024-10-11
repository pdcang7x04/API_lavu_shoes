var express = require('express');
const { insert, update, deleteById, getCategoryById, getAll } = require('../controller/category/categoryController');
var router = express.Router();


/**
 * lấy danh sách thương hiệu
 * method: get
 * url: http://localhost:3000/categories/getCategory
 */
router.get('/getCategory', async (req, res, next) => {
    try {
        const page = req.query.page
        const limit = req.query.limit
        const keywords = req.query.keywords
        const data = await getAll(page, limit, keywords)
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
 * thêm loại sản phẩm
 * method: post
 * url: http://localhost:3000/categories/insert
{
    "name": "Nam",
}
 */
router.post('/insert', async (req, res, next) => {
    try {
        const {name} = req.body
        const data = await insert(name)
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
 * cập nhật loại sản phẩm
 * method: put
 * url: http://localhost:3000/categories/update/:id
{
    "name": "Nam",
}

 */
router.put('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const {name} = req.body
        const data = await update(id, name)
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
 * xóa loại sản phẩm
 * method: delete
 * url: http://localhost:3000/categories/deleteById/:id
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
 * url: http://localhost:3000/categories/getCategoryById/:id
 */
router.get('/getCategoryById/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await getCategoryById(id)
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
