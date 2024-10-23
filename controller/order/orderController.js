const productModel = require("../product/productModel");
const orderModel = require("./orderModel");
const userModel = require("../user/userModel")
const AccountGoogle = require("../user/AccountGoogle")

// tạo đơn hàng
const create = async (user, paymentmethod, totalAmount, paymentStatus, product) => {
    try {
        let userdata = await userModel.findOne({ email: user }) || AccountGoogle.findOne({ email: user })
        if (!userdata) {
            throw new Error('Người dùng không tồn tại');
        }

        
        

        const newOder = new orderModel({
            user: userdata,
            paymentmethod: paymentmethod,
            totalAmount: totalAmount,
            shippingAddress: {
                address: userdata.address,
                phone: userdata.phone
            },
            paymentStatus: paymentStatus,
            orderDetail: product
        })

        for (const item of product) {
            const productInStock = await productModel.findById(item.product_id);
            if (productInStock) {
                productInStock.currentQuantity -= item.quantity; 
                if (productInStock.stock < 0) {
                    throw new Error('Không đủ hàng trong kho cho sản phẩm: ' + productInStock.name);
                }
                await productInStock.save();
            }
        }

        const result = await newOder.save()
        return result
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// lịch sử mua hàng
const getHistoryShopping = async (email) => {
    try {
        let userdata = await userModel.findOne({ email: email }) || AccountGoogle.findOne({ email: email })
        if (!userdata) {
            throw new Error('Người dùng không tồn tại');
        }
        let sort = { createdAt: -1 };
        const data = await orderModel
            .find({ 'user.email': userdata.email })
            .sort(sort)
        return data
    } catch (error) {
        console.log(error)
    }
}

// cập nhật trạng thái đơn hàng
const updateStatusOrder = async (_id, paymentStatus) => {
    try {
        let data = await orderModel.findById(_id)
        if (!data) {
            throw new Error('Đơn hàng không tồn tại');
        }
        if (data.paymentStatus = 4) {
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
const getOrder = async (page, limit, keywords) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20; 
        let skip = (page - 1) * limit; // Tính số lượng sản phẩm bỏ qua

        // Sắp xếp theo ngày tạo
        let sort = { createdAt: -1 };

        // Tạo truy vấn tìm kiếm
        let query = {
            'user.username': { $regex: keywords, $options: 'i' } // Tìm kiếm theo tên sản phẩm
        };
        const data = await orderModel
            .find({})
            .limit(limit)
            .skip(skip)
            .sort(sort)

        const totalBrand = await orderModel.countDocuments(query);

        return {
            data: data,
            total: totalBrand,
            currentPage: page,
            totalPages: Math.ceil(totalBrand / limit), // Tính tổng số trang
        };
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error.message);
        throw error; // Ném lỗi để xử lý ở nơi khác
    }
}

module.exports = { create, updateStatusOrder, getOrder, getHistoryShopping };