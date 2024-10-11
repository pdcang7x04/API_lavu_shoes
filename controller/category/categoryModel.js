const { Schema, mongoose } = require("mongoose");

const categorySchema = new Schema({
    name: {type: String, required: true},

    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})

module.exports = mongoose.models.category || mongoose.model('category', categorySchema);