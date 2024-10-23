var express = require('express');
const { register, login, registerAdmin, updateUser, updatePassword, changePassword, updateShippingAddress, sendOTPVerificationEmail, verifyOTP, getUserByID, signInWithGoogle, getUser } = require('../controller/user/userController');
const userModel = require('../controller/user/userModel');
var router = express.Router();

/* 
    đăng ký tài khoản khách hàng
    method: post
    url: http://localhost:3000/users/register
    {
      "username": "Lê Thị Thu Diễm",
      "email": "thudiem111@gmail.com",
      "password": "Diem@123",
    }
*/
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const data = await register(username, email, password)
    if (data) {
      return res.status(200).json({ status: true, data: data });
    } else {
      return res.status(400).json({ status: false, error: 'Failed to create new user' });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});

/* 
    đăng ký tài khoản khách hàng bằng google
    method: post
    url: http://localhost:3000/users/signInWithGoogle
    {
      "username": "Lê Thị Thu Diễm",
      "email": "thudiem111@gmail.com",
      "password": "Diem@123",
    }
*/
router.post('/signInWithGoogle', async (req, res, next) => {
  try {
    const { username, email, image } = req.body
    const data = await signInWithGoogle(username, email, image)
    if (data) {
      return res.status(200).json({ status: true, data: data });
    } else {
      return res.status(400).json({ status: false, error: 'Failed to create new user' });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});




/* 
    đăng ký tài khoản admin
    method: post
    url: http://localhost:3000/users/registerAdmin
    {
        "username": "Admin",
        "email": "phamdinhcang350@gmail.com",
        "password": "Admin@123"
    }
*/
router.post('/registerAdmin', async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const newdata = await registerAdmin(username, email, password)
    if (newdata) {
      return res.status(200).json({ status: true, data: newdata });
    } else {
      return res.status(400).json({ status: false, error: 'Failed to create new Admin' });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});


/**
 * Lấy danh sách người dùng
 * method: GET
 * url: http://localhost:3000/users/getUser
 */
router.get('/getUser', async (req, res, next) => {
  try {
    let page = req.query.page
    let limit = req.query.limit
    let keywords = req.query.keywords

    const data = await getUser(page, limit, keywords)

    if (data) {
      return res.status(200).json({ status: true, data: data });
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    console.error('Lỗi khi lấy người dùng:', error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});

/**
 * Lấy danh sách người dùng
 * method: GET
 * url: http://localhost:3000/users/getUserByID
 */
router.get('/getUserByID/:_id', async (req, res, next) => {
  try {
    let _id = req.params._id

    const data = await getUserByID(_id)

    if (data) {
      return res.status(200).json({ status: true, data: data });
    } else {
      return res.status(400).json({ status: false, error: 'No data found' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy người dùng:', error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});


/* 
    đăng nhập tài khoản khách hàng
    method: POST
    url: http://localhost:3000/users/login
    {
        "email": "thudiem111@gmail.com",
        "password": "Diem@123",
    }
*/
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const data = await login(email, password)
    if (data) {
      return res.status(200).json({ status: true, data: data });
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});

/**
 * Cập nhật người dùng
 * method: PUT
 * url: http://localhost:3000/users/updateUser/66f771aab5aa82a2f610f423
  {
    "username": "",
    "email": "",
    "image": ""
  }
 */
router.put('/updateUser/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id
    const { username, email, image } = req.body
    const data = await updateUser(_id, username, email, image)
    if (data) {
      return res.status(200).json({ status: true, data: data });
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});


/**
 * gửi OTP khi người dùng quên mật khẩu
 * method: post
 * url: http://localhost:3000/users/sendOTPVerificationEmail
  {
   "email": "nhocrok@gmail.com"
  }
 */
router.post('/sendOTPVerificationEmail', async (req, res, next) => {
  try {
    const { email } = req.body
    const data = await sendOTPVerificationEmail(email)
    if (data) {
      return res.status(200).json({ status: true, data: data });
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});


/**
 * Xác minh mã OTP đã nhận
 * method: post
 * url: http://localhost:3000/users/verifyOTP
 {
  "_id": ,
  "otp": 
 }
 */
router.post('/verifyOTP', async (req, res, next) => {
  try {
    const { _id, otp } = req.body
    const data = await verifyOTP(_id, otp)
    if (data) {
      return res.status(200).json({ status: true, message: data });
    } else {
      return res.status(400).json({ status: false, message: data });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});

/**
 * Cập nhật mật khẩu khi quên mật khẩu
 * method: PUT
 * url: http://localhost:3000/users/forgotPassword/thudiem111@gmail.com
  {
    "password": "Diem@123"
  }
 */
router.put('/forgotPassword/:email', async (req, res, next) => {
  try {
    const email = req.params.email
    const { password } = req.body
    const data = await updatePassword(email, password)
    if (data) {
      return res.status(200).json({ status: true, data: data });
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});

/**
* Đổi mật khẩu
* method: PUT
* url: http://localhost:3000/users/changePassword/nhocrok@gmail.com
{
  "oldPassword": "Diem@123"
  "newPassword": "Diem@123456"
}
*/
router.put('/changePassword/:email', async (req, res, next) => {
  try {
    const email = req.params.email
    const { oldPassword, newPassword } = req.body
    const data = await changePassword(email, oldPassword, newPassword)
    if (data) {
      return res.status(200).json({ status: true, data: data });
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});

/**
* cập nhật địa chỉ
* method: PUT
* url: http://localhost:3000/users/updateShippingAddress/66f771aab5aa82a2f610f423
{
  "address": "Tân thuận đông quận 7"
  "phone": ""
}
*/
router.put('/updateShippingAddress/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id
    const { address, phone } = req.body
    const data = await updateShippingAddress(_id, address, phone)
    if (data) {
      return res.status(200).json({ status: true, data: data });
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, error: error.message });
  }
});


module.exports = router;
