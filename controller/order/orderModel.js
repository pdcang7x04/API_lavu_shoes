const { Schema, mongoose } = require("mongoose");

const orderSchema = new Schema({
    user: {type: String, required: true},
    paymentmethod: {type: String, required: true},
    totalAmount: {type: Number, require: true},
    shippingAddress: {type: Object, required: true},
    paymentStatus: {type: Number, required: true},  
    orderDetail: {type: Object, required: true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})
/**
 * trạng thái thanh toán
 * 1: chưa thanh toán
 * 2: đã thanh toán
 * 3: Đang giao
 * 4: đã hủy
 */
module.exports = mongoose.models.order || mongoose.model('order', orderSchema);