const orderModel = require("../order/orderModel");
const productModel = require("../product/productModel");
const userModel = require("../user/userModel");
const commentModel = require("./commentModel");

const writeAReview = async (userId, productId, orderId, content, evaluate) => {
    try {
        let user = await userModel.findById(userId);

        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }

        const product = await productModel.findById(productId);

        if (!product) {
            throw new Error('Không tìm thấy sản phẩm với ID đã cho');
        }

        const order = await orderModel.findById(orderId);

        if (!order) {
            throw new Error('Không tìm thấy đơn hàng với ID đã cho');
        }

        const data = new commentModel({
            user: user,
            product: product._id,
            order: orderId,
            content: content,
            evaluate: evaluate
        })

        const result = await data.save()
        return result
    } catch (error) {
        console.log(error)
    }
}

const getReviewByProduct = async (productId) => {
    try {
        let sort = { createdAt: -1 };
        const data = await commentModel
            .find({product: productId})
            .sort(sort);

        if (!data) {
            throw new Error('Không tìm thấy sản phẩm với ID đã cho');
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

const updateAReview = async (id, content, evaluate) => {
    try {
        let comment = await commentModel.findById(id);

        if (!comment) {
            throw new Error('Người dùng không tồn tại');
        }

        comment.content = content || comment.content
        comment.evaluate = evaluate || comment.evaluate
        comment.updatedAt = Date.now()
        

        

        const result = await comment.save()
        return result
    } catch (error) {
        console.log(error)
    }
}


module.exports = { writeAReview, getReviewByProduct, updateAReview };