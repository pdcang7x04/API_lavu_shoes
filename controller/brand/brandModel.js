const { Schema, mongoose } = require("mongoose");

const brandSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},

    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})

module.exports = mongoose.models.brand || mongoose.model('brand', brandSchema);