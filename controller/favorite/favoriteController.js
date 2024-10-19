const userModel = require("../user/userModel")
const productModel = require("../product/productModel");
const favoriteModel = require("./favoriteModel");



// thêm sản phẩm yêu thích
const insert = async (email, product_id) => {
    try {
        const user = await userModel.findOne({email: email})
        if (!user) {
            throw new Error('Người dùng không tồn tại')
        }

        const product = await productModel.findOne({_id: product_id})
        if (!product) {
            throw new Error('Sản phẩm không tồn tại')
        }

        const productFavorite = new favoriteModel({
            product: product,
            user: user.email
        })
        await productFavorite.save()
        const data = await favoriteModel.find({user: email})
        return data
    } catch (error) {
        console.log("error: ", error.message)
    }
}

// xóa sản p yêu thích
const removeFavoriteProduct = async (_id) => {
    try {
        // Tìm sản phẩm yêu thích theo ID
        const data = await favoriteModel.findById(_id);

        // Kiểm tra xem sản phẩm yêu thích có tồn tại không
        if (!data) {
            return { success: false, message: 'Sản phẩm yêu thích không tồn tại' };
        }

        // Xóa sản phẩm yêu thích
        await favoriteModel.deleteOne({ _id });
        return {message: 'Xóa sản phẩm yêu thích thành công'}
        
    } catch (error) {
        console.error("Error removing favorite product:", error.message);
        return { success: false, message: 'Có lỗi xảy ra trong quá trình xóa sản phẩm yêu thích' };
    }
}

//lấy sanh sách
const getProductFavorite = async (email) => {
    try {
        const data = await favoriteModel.find({user: email.toString()})
        return data
    } catch (error) {
        console.log(error)
    }
}

module.exports = { insert, removeFavoriteProduct, getProductFavorite };