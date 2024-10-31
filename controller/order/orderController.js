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
                productInStock.quantitySold += item.quantity;
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
        // Tìm kiếm đơn hàng theo ID
        const order = await orderModel.findById(_id);
        if (!order) {
            throw new Error('Đơn hàng không tồn tại');
        }
        // Kiểm tra trạng thái thanh toán
        if (order.paymentStatus === 6) {
            throw new Error('Đơn hàng đã bị hủy');
        }


        // Cập nhật trạng thái thanh toán và thời gian cập nhật
        order.paymentStatus = paymentStatus;
        order.updatedAt = Date.now();

        // Lưu lại thay đổi
        const updatedOrder = await order.save();
        return updatedOrder;

    } catch (error) {
        console.error("Error updating order status:", error.message);
        throw error; // Ném lại lỗi để xử lý ở nơi khác nếu cần
    }
};

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

const getSalesAnhPurchase = async () => {
    try {
        const monthlyOrderData = {};
        const orders = await orderModel.find({});

        // Group order data by month
        for (const item of orders) {
            const month = item.createdAt.toString().slice(4, 7);
            if (!monthlyOrderData[month]) {
                monthlyOrderData[month] = {
                    month: month,
                    sales: 0,
                    purchase: 0,
                    revenue: 0,
                    profit: 0
                };
            }

            // Total quantity sold
            const totalQuantitySold = item.orderDetail.reduce((total, currentItem) => total + currentItem.quantity, 0);
            monthlyOrderData[month].sales += totalQuantitySold;

            // Assume total purchase quantity for the month
            monthlyOrderData[month].purchase = 100;

            // Use Promise.all to fetch product details concurrently
            const productPromises = item.orderDetail.map(async (detail) => {
                const product = await productModel.findById(detail.product_id);
                const revenue = detail.quantity * product.price;
                const cost = 50000; // Assuming a fixed cost per item
                monthlyOrderData[month].revenue += revenue;
                monthlyOrderData[month].profit += (revenue - cost);
            });

            // Wait for all product promises to resolve
            await Promise.all(productPromises);
        }

        return monthlyOrderData;
    } catch (error) {
        console.log('Insert cart error:', error);
        throw new Error('Insert cart error');
    }
};
const getOrderSummary = async () => {
    try {
        const monthlyOrderData = {};
        const order = await orderModel.find({});
        // Nhóm dữ liệu giỏ hàng theo tháng
        order.forEach(item => {
            const month = item.createdAt.toString().slice(4, 7);
            if (!monthlyOrderData[month]) {
                monthlyOrderData[month] = {
                    month: month,
                    ordered: 0,
                    delivered: 0,
                    cancled: 0
                };
            }

            // số lượng đơn đã đặt
            monthlyOrderData[month].ordered++
            // // số lượng đơn đã hủy
            if(item.paymentStatus == 5){
                monthlyOrderData[month].delivered++
            }
            // số lượng đơn đã hủy
            if(item.paymentStatus == 6){
                monthlyOrderData[month].cancled++
            }
            
        });

        return monthlyOrderData;
    } catch (error) {
        console.log('Insert cart error:', error);
        throw new Error('Insert cart error');
    }
}



module.exports = { create, updateStatusOrder, getOrder, getHistoryShopping, getSalesAnhPurchase, getOrderSummary };