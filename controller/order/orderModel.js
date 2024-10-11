const { Schema, mongoose } = require("mongoose");

const orderSchema = new Schema({
    user: {type: String, required: true},
    paymentmethod: {type: String, required: true},
    TotalAmount: {type: Number, require: true},
    shippingAddress: {type: String, required: true},
    paymentStatus: {type: Number, required: true},  

    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})
/**
 * trạng thái thanh toán
 * 1: chưa thanh toán
 * 2: đang chờ thanh toán,
 * 3: đã thanh toán
 * 4: đã hủy
 */
module.exports = mongoose.models.order || mongoose.model('order', orderSchema);