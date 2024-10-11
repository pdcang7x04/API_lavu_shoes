var express = require('express');
const { getBrand, insert, update, deleteById, getBrandById } = require('../controller/brand/brandController');
var router = express.Router();

/**
 * lấy danh sách thương hiệu
 * method: get
 * url: http://localhost:3000/brands/getBrand
 */
router.get('/getBrand', async (req, res, next) => {
    try {
        const page = req.query.page
        const limit = req.query.limit
        const keywords = req.query.keywords
        const data = await getBrand(page, limit, keywords)
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
 * thêm thương hiệu
 * method: post
 * url: http://localhost:3000/brands/insert
{
    "name": "Nike",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAbCAYAAAAzgqwIAAAAAXNSR0IArs4c6QAAA09JREFUWAm9WO1x2zAMzQj5054p9a7qmfT1J7qBR8gI2aDdwN2g2UDdIN2gI3gEj+AR3HsQwUAoJVOUndzpaH5B7wGPAJWHh4q/jad9ejrqYOJDINJjuv/Y0WOa87RHH3v02NTvCnjLtrSBnptAF3k+bulp85U66aMFON1vtvQkfRfohDe2gX6psb/yW7duR3+WoatY3Xh61S8F+HZLLzLmAh0N6b4JhEec0Dc7OqT+ju3peVl32QR6roBYvsVGAqDcl2+fm0AnAQgQbaCj9BFBPa/JIlqQXxvoLOtdoO+wcXcyoK3BCAAtJx4z8jLyA3AmDzKbjjptU+RY7uKVK12gnNaTXJzn+dSPUtP9JKc2EAGOlrDz9GMlxPLtObk1SiqIDmQiEZBoaTlJVAW4tYm1eN4lUgAhgCZbIzctJ70HKR2unJpHZMtdvXCl1IyR59WhV0AhLS2vfkKinNYBw8z3jaefeHC2FsIsWw5JxCxECjjOgQbO5wLZbCQvFS3sRU0RG1xEbe2qJAHykPonlI8Y+Sw7kHFbesGkIdDrusNgA520fGwtwplg78daBEJawkgmWRCZQTgYmdV5LsxH2BUVZZYPQ7wp0Alex4iWW6wrv8XbsR3JCx7TcmLwkJMipG02ng7s6W5QhAXGqX9HB7EJB+AdV4mIIbmWYIOuI5J9dKoFyJjdUkrWe3i+o05HaPT77QbB+0Ee5NCCgJYxE/G0F5xFrZIO37ms3GBEPAWwIKn2XPDSnJwMiXQzkKjNtOciWeXYxboglfzI4Id7GmcwnW5xvkCWozPIachySAamDzvxRsFr3HB/S9elHBlxTLGscoRMNDhCuXU1Y3BGTkaWTJWscoBs1caLJCK59dfG+PwNN4denwNLIPbPiPhN64+JznBAw7J0GtMxvnPSbXuCgNjndL5KVjnPdsjtJttIH3qf8lypjMSWtDeTVY4Mxv77BDDk+ML49iHWg2SBjFIaj0QGWS1Nu1Og58ZNSrVA1vbr0+4c6Lm5JpCt/GtJcD1C5Ofee7e5W0bIeXpFcrgb2BLD9qoih3dB+/6yukZMX2dKidykml8DVjvPnwvqvzczpM53T7u1JOw+1CO+WPpxYeTvmXhvu3kRtCBW9v8Bv2o+oVlrvvUAAAAASUVORK5CYII="
}
 */
router.post('/insert', async (req, res, next) => {
    try {
        const {name, image} = req.body
        const data = await insert(name, image)
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
 * cập nhật thương hiệu
 * method: put
 * url: http://localhost:3000/brands/update/:id
{
    "name": "Nike",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAbCAYAAAAzgqwIAAAAAXNSR0IArs4c6QAAA09JREFUWAm9WO1x2zAMzQj5054p9a7qmfT1J7qBR8gI2aDdwN2g2UDdIN2gI3gEj+AR3HsQwUAoJVOUndzpaH5B7wGPAJWHh4q/jad9ejrqYOJDINJjuv/Y0WOa87RHH3v02NTvCnjLtrSBnptAF3k+bulp85U66aMFON1vtvQkfRfohDe2gX6psb/yW7duR3+WoatY3Xh61S8F+HZLLzLmAh0N6b4JhEec0Dc7OqT+ju3peVl32QR6roBYvsVGAqDcl2+fm0AnAQgQbaCj9BFBPa/JIlqQXxvoLOtdoO+wcXcyoK3BCAAtJx4z8jLyA3AmDzKbjjptU+RY7uKVK12gnNaTXJzn+dSPUtP9JKc2EAGOlrDz9GMlxPLtObk1SiqIDmQiEZBoaTlJVAW4tYm1eN4lUgAhgCZbIzctJ70HKR2unJpHZMtdvXCl1IyR59WhV0AhLS2vfkKinNYBw8z3jaefeHC2FsIsWw5JxCxECjjOgQbO5wLZbCQvFS3sRU0RG1xEbe2qJAHykPonlI8Y+Sw7kHFbesGkIdDrusNgA520fGwtwplg78daBEJawkgmWRCZQTgYmdV5LsxH2BUVZZYPQ7wp0Alex4iWW6wrv8XbsR3JCx7TcmLwkJMipG02ng7s6W5QhAXGqX9HB7EJB+AdV4mIIbmWYIOuI5J9dKoFyJjdUkrWe3i+o05HaPT77QbB+0Ee5NCCgJYxE/G0F5xFrZIO37ms3GBEPAWwIKn2XPDSnJwMiXQzkKjNtOciWeXYxboglfzI4Id7GmcwnW5xvkCWozPIachySAamDzvxRsFr3HB/S9elHBlxTLGscoRMNDhCuXU1Y3BGTkaWTJWscoBs1caLJCK59dfG+PwNN4denwNLIPbPiPhN64+JznBAw7J0GtMxvnPSbXuCgNjndL5KVjnPdsjtJttIH3qf8lypjMSWtDeTVY4Mxv77BDDk+ML49iHWg2SBjFIaj0QGWS1Nu1Og58ZNSrVA1vbr0+4c6Lm5JpCt/GtJcD1C5Ofee7e5W0bIeXpFcrgb2BLD9qoih3dB+/6yukZMX2dKidykml8DVjvPnwvqvzczpM53T7u1JOw+1CO+WPpxYeTvmXhvu3kRtCBW9v8Bv2o+oVlrvvUAAAAASUVORK5CYII="
}

 */
router.put('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const {name, image} = req.body
        const data = await update(id, name, image)
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
 * xóa thương hiệu
 * method: delete
 * url: http://localhost:3000/brands/deleteById/:id
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
 * lấy thông tin thương hiệu theo id
 * method: get
 * url: http://localhost:3000/brands/getBrandById/:id
 */
router.get('/getBrandById/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await getBrandById(id)
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
