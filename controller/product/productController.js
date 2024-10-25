const { default: mongoose } = require("mongoose");
const brandModel = require("../brand/brandModel");
const categoryModel = require("../category/categoryModel");
const productModel = require("./productModel");

/**
 * 1: hàng mới
 * 2: khuyến mãi
 * 3: bán chạy
 * 4: hàng giới hạn
 */
const status = [1, 2, 3, 4]
// data test
const dataTest = async () => {
    try {
        //lấy danh sách danh mục
        const brands = await brandModel.find();
        const categories = await categoryModel.find();
        for (let index = 20; index < 50; index++) {
            //lấy ngẫu nhiên 1 danh mục
            const brand = brands[Math.floor(Math.random() * brands.length)];
            const category = categories[Math.floor(Math.random() * categories.length)];
            const product = new productModel({
                name: `Product ${index}`,
                price: 200000 * index,
                currentQuantity: 100 * index,
                description: "Air Jordan là một thương hiệu giày bóng rổ của Mỹ, chuyên về quần áo thể thao, thường ngày và thời trang được sản xuất bởi Nike....",
                image: 'https://i.pinimg.com/564x/47/35/9a/47359a80edd62bcd25abad1ccff4a025.jpg',
                color: [
                    {
                        name: "Trắng",
                        image: "https://i.pinimg.com/564x/47/35/9a/47359a80edd62bcd25abad1ccff4a025.jpg"
                    },
                    {
                        name: "Xanh lá cây",
                        image: "https://i.pinimg.com/564x/cc/20/9a/cc209aac79338b51a9dc2ce491344c4a.jpg"
                    },
                    {
                        name: "Xanh dương",
                        image: "https://i.pinimg.com/564x/8f/b9/66/8fb9667188613b6766d7241193127b64.jpg"
                    }
                ],
                size: [36, 37, 38, 39, 40, 41, 42, 43, 44, 54],
                status: status[Math.floor(Math.random() * status.length)],
                brand: {
                    _id: brand._id,
                    name: brand.name
                },
                category: {
                    _id: category._id,
                    name: category.name
                }
            });
            await product.save();

        }


    } catch (error) {
        console.log('Insert product error:', error);
        throw new Error('Insert product error');
    }
}

//thêm mới brand
const insert = async (name, price, currentQuantity, description, images, colors, sizes, status, brand, category) => {
    try {

        // Tìm thương hiệu dựa trên tên thương hiệu
        const branddata = await brandModel.findById( brand );

        // Nếu không tìm thấy thương hiệu, có thể ném lỗi hoặc xử lý tùy theo yêu cầu
        if (!branddata) {
            throw new Error('Thương hiệu không tồn tại');
        }
        console.log('brand: ', branddata)
        // Tìm thương hiệu dựa trên tên thương hiệu
        const categorydata = await categoryModel.findById( category );

        // Nếu không tìm thấy thương hiệu, có thể ném lỗi hoặc xử lý tùy theo yêu cầu
        if (!categorydata) {
            throw new Error('Loại sản phẩm không tồn tại');
        }
        console.log('cate: ', categorydata)

        // Tạo một sản phẩm mới
        const newdata = new productModel({
            name: name,
            price: price,
            currentQuantity: currentQuantity,
            description: description,
            image: images,
            color: colors,
            size: sizes,
            status: status,
            brand: {
                _id: branddata._id,
                name: branddata.name
            },
            category: {
                _id: categorydata._id,
                name: categorydata.name
            }
        });

        // Lưu sản phẩm vào cơ sở dữ liệu
        const result = await newdata.save();
        return result;

    } catch (error) {
        console.error(error.message); // Sử dụng console.error để ghi lại lỗi
        throw error; // Ném lỗi để xử lý ở nơi khác
    }
}
// cập nhật brand
const update = async (_id, name, price, currentQuantity, description, image, color, size, status, brand, category) => {
    try {
        const data = await productModel.findById(_id);

        if (!data) {
            throw new Error('Không tìm thấy sản phẩm với ID đã cho');
        }

        data.name = name || data.name
        data.price = price || data.price
        data.currentQuantity = currentQuantity || data.currentQuantity
        data.description = description || data.description
        data.image = image || data.image
        data.color = color || data.color
        data.size = size || data.size
        data.status = status || data.status
        data.brand = brand || data.brand
        data.category = category || data.category
        data.updatedAt = Date.now()

        const result = await data.save()
        return result
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// xáo brand
const deleteById = async (id) => {
    try {
        const data = await productModel.findByIdAndDelete(id);

        if (!data) {
            console.log('Không tìm thấy thương hiệu với ID đã cho');
            return null;
        }

        console.log('Sản phẩm đã được xóa:', data);
        return data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi xóa thương hiệu:', error);
    }
};

// lấy sản phẩm theo id
const getProductById = async (id) => {
    try {
        const data = await productModel.findById(id);

        if (!data) {
            console.log('Không tìm thấy sản phẩm với ID đã cho');
            return null;
        }
        return data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
    }
};

// lấy sản phẩm theo brand
const getProductByBrand = async (id) => {
    try {
        // Sử dụng 'new' để tạo ObjectId
        const brandId = new mongoose.Types.ObjectId(id);

        const data = await productModel
            .find({ "brand._id": brandId })

        if (!data || data.length === 0) {
            throw new Error('Không tìm thấy sản phẩm với thương hiệu đã cho');
        }

        return data; // Trả về danh sách sản phẩm tìm thấy
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
        throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi hàm
    }
};




const getProduct = async (page, limit, keywords) => {
    try {
        // Chuyển đổi page và limit thành số nguyên
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20; 
        let skip = (page - 1) * limit; // Tính số lượng sản phẩm bỏ qua

        // Sắp xếp theo ngày tạo
        let sort = { createdAt: -1 };

        // Tạo truy vấn tìm kiếm
        let query = {
            name: { $regex: keywords, $options: 'i' } // Tìm kiếm theo tên sản phẩm
        };

        // Lấy danh sách sản phẩm từ cơ sở dữ liệu
        let products = await productModel
            .find(query) // Tìm sản phẩm theo query
            .skip(skip) // Bỏ qua số sản phẩm đã tính toán
            .limit(limit) // Giới hạn số lượng sản phẩm trả về
            .sort(sort); // Sắp xếp theo trường createdAt

        // Tính tổng số sản phẩm thỏa mãn điều kiện
        const totalProducts = await productModel.countDocuments(query);

        // Trả về kết quả
        return {
            status: true,
            data: products,
            total: totalProducts,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit), // Tính tổng số trang
        };
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error.message);
        throw error; // Ném lỗi để xử lý ở nơi khác
    }
};

module.exports = { dataTest, insert, update, deleteById, getProductById, getProduct, getProductByBrand };