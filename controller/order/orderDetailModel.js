const { Schema, mongoose } = require("mongoose");

const orderDetailSchema = new Schema({
   products: {type: Object, required: true},
   quantity: {type: Number, required: true},
   size: {type: Number, required: true},
   totalPrice: {type: Number, required: true},
   discount: {type: Number, default: 0}
})

module.exports = mongoose.models.orderDetail || mongoose.model('orderDetail', orderDetailSchema);