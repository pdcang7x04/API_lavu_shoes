const { query } = require("express")
const { sendMail } = require("../../util/mailer")
const userModel = require("./userModel")
const bcrypt = require("bcryptjs")
const userOTPVerification = require("./UserOTPVerification")
const { create } = require("hbs")
const AccountGoogle = require("./AccountGoogle")

// đăng ký khách hàng
const register = async (username, email, password) => {
    try {
        let data = await userModel.findOne({ email: email })
        if (data) {
            throw new Error('Người dùng đã tồn tại')
        }
        let dataGoogle = await AccountGoogle.findOne({ email: email })
        if (dataGoogle) {
            throw new Error('Người dùng đã tồn tại')
        }

        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        password = bcrypt.hashSync(password, salt);

        data = new userModel({
            username: username,
            email: email,
            password: password,
            role: 1 // user
        })

        //gửi email đăng ký thành công
        setTimeout(async () => {
            const emailData = {
                email: email,
                subject: "wellcome",
                content: "",
            };
            await sendMail(emailData);
        }, 0);

        const result = await data.save();

        result.password = undefined;

        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// đăng ký tài khoản khách hàng bằng google
const signInWithGoogle = async (username, email, image) => {
    try {
        let dataGoogle = await AccountGoogle.findOne({ email: email })
        if (dataGoogle) {
            return dataGoogle;
        } else {
            let data = await userModel.findOne({ email: email })
            if (data) {
                throw new Error('Người dùng đã tồn tại')
            }
            data = new AccountGoogle({
                username: username,
                email: email,
                image: image,
                role: 1 // user
            })

            //gửi email đăng ký thành công
            setTimeout(async () => {
                const emailData = {
                    email: email,
                    subject: "wellcome",
                    content: "",
                };
                await sendMail(emailData);
            }, 0);

            const result = await data.save();

            return result;
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// Đăng nhập
const login = async (email, password) => {
    try {
        let data = await userModel.findOne({ email: email })
        if (!data) {
            throw new Error('Người dùng không tồn tại')
        }

        const isPasswordMatched = await bcrypt.compare(password, data.password);
        if (!isPasswordMatched) {
            throw new Error('Password không đúng');
        } else {
            const user = new userModel({
                _id: data._id,
                username: data.username,
                email: data.email,
                phone: data.phone,
                address: data.address,
                image: data.image,
                role: data.role
            })
            return user;
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// đăng ký role admin
const registerAdmin = async (username, email, password) => {
    try {
        let userdata = await userModel.findOne({ email: email })
        if (userdata) {
            throw new Error('Người dùng đã tồn tại')
        }

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let password = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        password = bcrypt.hashSync(password, salt);

        userdata = new userModel({
            username: username,
            email: email,
            password: password,
            image: image,
            role: 2 // admin
        })

        //gửi email đăng ký thành công
        setTimeout(async () => {
            const emailData = {
                email: email,
                subject: "wellcome",
                content: "",
            };
            await sendMail(emailData);
        }, 0);

        const result = await userdata.save();

        result.password = undefined;

        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// cập nhật thông tin khách hàng
const updateUser = async (_id, username, email, image) => {
    try {
        let user = await userModel.findById(_id);

        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.image = image || user.image;
        user.updatedAt = Date.now();

        return await user.save()
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// lấy danh sách khách hàng
const getUser = async (page, limit, keywords) => {
    try {
        page = parseInt(page) || 1
        limit = parseInt(limit) || 20
        let sort = { createdAt: -1 };
        let query = { 
            role: 1,
            name: { $regex: keywords, $options: 'i' }
        }
        

        let result = userModel
            .find(query)
            .limit(limit)
            .sort(sort)
        return result
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// lấy thông tin khách hàng theo id
const getUserByID = async (_id) => {
    try {
        const user = await userModel.findById(_id)
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }
        return user
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}


// Quên mật khẩu
// gửi OPT qua email
const sendOTPVerificationEmail = async (email) => {
    try {
        let data = await userModel.findOne({ email: email })
        if (!data) {
            throw new Error('Người dùng không tồn tại')
        }
        /// tạo mã otp
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        //gửi email đăng ký thành công
        setTimeout(async () => {
            const emailData = {
                email: email,
                subject: "Password Reset Request",
                content: `<p>
                    Dear User,<br>

                    We have received a request to reset the password for your account. To proceed, please use the OTP code below:<br>

                    OTP Code: <h4>${otp}</h4><br>

                    This OTP code will expire in 10 minutes. If you did not request a password reset, please disregard this email.<br>

                    After entering the OTP, you will be able to create a new password for your account.<br>

                    If you need further assistance, please don’t hesitate to contact us.<br>

                    Best regards,<br>
                </p>`,
            };
            await sendMail(emailData);
        }, 0);

        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedOTP = bcrypt.hashSync(otp, salt);
        const newuserOTPVerification = new userOTPVerification({
            otp: hashedOTP,
            expriresAt: Date.now() + 600000,
        });

        result = await newuserOTPVerification.save()
        return result
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// xác minh OTP đã nhận
const verifyOTP = async (_id, otp) => {
    try {
        const idOTP = await userOTPVerification.findById(_id)
        if (!idOTP) {
            throw new Error('Mã OTP không tồn tại')
        }

        const isOTPCode = await bcrypt.compare(otp, idOTP.otp);
        if (!isOTPCode) {
            throw new Error('OTP không đúng');
        } else {
            if (idOTP.expriresAt < Date.now()) {
                await idOTP.deleteMany({ _id })
                throw new Error('Code has expired. Please request again.');
            } else {
                await userModel.updateOne({ _id: _id }, { permission: true })
                const result = await userOTPVerification.deleteMany({ _id })
                return result
            }
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// cập nhật mật khẩu
const updatePassword = async (email, password) => {
    try {
        let data = await userModel.findOne({ email: email })
        if (!data) {
            throw new Error('Người dùng không tồn tại')
        }

        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        password = bcrypt.hashSync(password, salt);


        data.password = password
        data.updatedAt = Date.now();

        const result = await data.save()
        return result
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// Đổi mật khẩu mật khẩu
const changePassword = async (email, oldPassword, newPassword) => {
    try {
        let data = await userModel.findOne({ email: email })
        if (!data) {
            throw new Error('Người dùng không tồn tại')
        }

        const isPasswordMatched = await bcrypt.compare(oldPassword, data.password);
        if (!isPasswordMatched) {
            throw new Error('Password không đúng');
        } else {
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds)
            newPassword = bcrypt.hashSync(newPassword, salt);

            data.password = newPassword
            data.updatedAt = Date.now();

            const result = await data.save()
            return result
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// Shipping Address
const updateShippingAddress = async (_id, address, phone) => {
    try {
        const user = await userModel.findById(_id)
        if (!user) {
            throw new Error('Người dùng không tồn tại')
        }

        user.address = address || user.address
        user.phone = phone || user.phone

        const result = await user.save();
        return result
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = {
    register,
    login,
    registerAdmin,
    updateUser,
    getUser,
    updatePassword,
    changePassword,
    updateShippingAddress,
    sendOTPVerificationEmail,
    verifyOTP,
    getUserByID,
    signInWithGoogle
};