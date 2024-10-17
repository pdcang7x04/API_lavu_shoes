const { Schema, mongoose } = require("mongoose");

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    currentQuantity:{type: Number, required: true},
    description: {type: String, default: ' '},
    image: {type: Array, required: true},
    color: {type: Object, required: true},
    size: {type: Array, required: true},
    status: {type: Number, default: 1}, // 1: mới nhất 2: bán chạy 3: phổ biến 4: sản phẩm có hạn, 5: hết hàng
    brand: {type: Object, required: true},
    category: {type: Object, required: true},

    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})

module.exports = mongoose.models.product || mongoose.model('product', productSchema);