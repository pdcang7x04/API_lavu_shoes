const { Schema, mongoose } = require("mongoose");

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    currentQuantity:{type: Number, required: true},
    description: {type: String, default: ' '},
    image: {type: Array, required: true},
    color: {type: Object, required: true},
    size: {type: Array, required: true},
    status: {type: Number, default: 1}, // 1: new
    brand: {type: Object, required: true},
    category: {type: Object, required: true},

    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})

module.exports = mongoose.models.product || mongoose.model('product', productSchema);