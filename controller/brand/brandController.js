const brandModel = require("./brandModel");

//thêm mới brand
const insert = async (name, image) => {
    try {
        let newbrand = await brandModel.findOne({ name: name })
        if (newbrand) {
            throw new Error('brand này đã tồn tại')
        }
        newbrand = new brandModel({
            name: name,
            image: image
        })

        const result = await newbrand.save();
        return result;

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// cập nhật brand
const update = async (id, name, image) => {
    try {
        const updatedBrand = await brandModel.findById(id);

        if (!updatedBrand) {
            throw new Error('Không tìm thấy thương hiệu với ID đã cho')
        }

        updatedBrand.name = name || updatedBrand.name
        updatedBrand.image = image || updatedBrand.image
        updatedBrand.updatedAt = Date.now()

        return updatedBrand.save()
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// xóa brand
const deleteById = async (id) => {
    try {
        const deletedBrand = await brandModel.findByIdAndDelete(id);

        if (!deletedBrand) {
            console.log('Không tìm thấy thương hiệu với ID đã cho');
            return null;
        }

        console.log('Thương hiệu đã được xóa:', deletedBrand);
        return deletedBrand;
    } catch (error) {
        console.error('Có lỗi xảy ra khi xóa thương hiệu:', error);
    }
};

// lấy sản phẩm theo id
const getBrandById = async (id) => {
    try {
        const data = await brandModel.findById(id);

        if (!data) {
            console.log('Không tìm thấy sản phẩm với ID đã cho');
            return null;
        }
        return data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
    }
};

const getBrand = async () => {
    try {
        const data = await brandModel.find({})
        return data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
    }
};

const getBrandByQuery = async (page, limit, keywords) => {
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
        let brand = await brandModel
            .find(query) // Tìm sản phẩm theo query
            .skip(skip) // Bỏ qua số sản phẩm đã tính toán
            .limit(limit) // Giới hạn số lượng sản phẩm trả về
            .sort(sort); // Sắp xếp theo trường createdAt

        // Tính tổng số sản phẩm thỏa mãn điều kiện
        const totalBrand = await brandModel.countDocuments(query);

        // Trả về kết quả
        return {
            status: true,
            data: brand,
            total: totalBrand,
            currentPage: page,
            totalPages: Math.ceil(totalBrand / limit), // Tính tổng số trang
        };
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error.message);
        throw error; // Ném lỗi để xử lý ở nơi khác
    }
};

module.exports = { insert, update, deleteById, getBrandById, getBrand, getBrandByQuery };