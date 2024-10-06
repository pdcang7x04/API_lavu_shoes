const { Schema, mongoose } = require("mongoose");

const userOTPVerificationSchema = new Schema({
    otp: {type: String, require: true},
    createdAt: {type: Date, default: Date.now()},
    expriresAt: {type: Date, default: Date.now()},
})

const userOTPVerification = mongoose.model(
    "userOTPVerification",
    userOTPVerificationSchema
);

module.exports = userOTPVerification;

