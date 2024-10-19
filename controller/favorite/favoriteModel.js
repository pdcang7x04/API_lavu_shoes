const { Schema, mongoose } = require("mongoose");

const favoriteSchema = new Schema({
    product: {type: Array, required: true},
    user: {type: String, required: true},

    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})

module.exports = mongoose.models.favorite || mongoose.model('favorite', favoriteSchema);