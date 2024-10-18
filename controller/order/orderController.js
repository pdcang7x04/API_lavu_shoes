const productModel = require("../product/productModel");
const orderModel = require("./orderModel");
const userModel = require("../user/userModel")
const AccountGoogle = require("../user/AccountGoogle")

// tạo đơn hàng
const create = async (user, paymentmethod, totalAmount, paymentStatus, product) => {
    try {
        let userdata = await userModel.findOne({email: user}) || AccountGoogle.findOne({email: user})
        if (!userdata) {
            throw new Error('Người dùng không tồn tại');
        }
        

        const newOder = new orderModel({
            user: userdata._id,
            paymentmethod: paymentmethod,
            totalAmount: totalAmount,
            shippingAddress: {
                address: userdata.address,
                phone: userdata.phone
            },
            paymentStatus: paymentStatus,
            orderDetail: product
        })

        const result = await newOder.save()
        return result
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// cập nhật trạng thái đơn hàng
const updateStatusOrder = async (_id, paymentStatus) => {
    try {
        let data = await orderModel.findById(_id)
        if (!data) {
            throw new Error('Đơn hàng không tồn tại');
        }
        if (data.paymentStatus = 4){
            throw new Error('Đơn hàng đã bị hủy');
        }

        data.paymentStatus = paymentStatus
        data.updatedAt = Date.now()

        const result = await data.save()
        return result

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

//lấy danh sách đơn hàng
const getOrder = async (page, limit) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20
        let sort = { createdAt: -1 };

        let order = orderModel
            .find()
            //giới hạn số lượng sản phẩm
            .limit(limit)
            //sắp sếp theo thời gian tạo
            .sort(sort);
        return order;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = { create, updateStatusOrder, getOrder };