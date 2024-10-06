const { Schema, mongoose } = require("mongoose");

const accountGoogleSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, default: " "},
    address: {type: String, default: " "},
    image: {type: String, default: "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg"},
    role: {type: Number, required: true}, //(1: user, 2: admin)
    permission: {type: Boolean, default: true},

    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
})

module.exports = mongoose.models.accountGoogle || mongoose.model('accountGoogle', accountGoogleSchema);