const { Schema, mongoose } = require("mongoose");

const commentSchema = new Schema({
    user: {type: Object, required: true},
    product: {type:String, required: true},
    content: {type: String , default: ' '},
    evaluate: {type: Number, required: true},

    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})

module.exports = mongoose.models.comment || mongoose.model('comment', commentSchema);