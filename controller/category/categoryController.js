const categoryModel = require("./categoryModel");

//thêm mới brand
const insert = async (name) => {
    try {
        let newCategory = await categoryModel.findOne({ name: name })
        if (newCategory) {
            throw new Error('brand này đã tồn tại')
        }
        newCategory = new categoryModel({
            name: name,
        })

        const result = await newCategory.save();
        return result;

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// cập nhật brand
const update = async (id, name) => {
    try {
        const updatedCategory = await categoryModel.findById(id);

        if (!updatedCategory) {
            throw new Error('Không tìm thấy thương hiệu với ID đã cho')
        }

        updatedCategory.name = name || updatedCategory.name
        updatedCategory.updatedAt = Date.now()

        return updatedCategory.save()
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

// xáo brand
const deleteById = async (id) => {
    try {
        const deletedCategory = await categoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            console.log('Không tìm thấy thương hiệu với ID đã cho');
            return null;
        }

        console.log('Thương hiệu đã được xóa:', deletedCategory);
        return deletedCategory;
    } catch (error) {
        console.error('Có lỗi xảy ra khi xóa thương hiệu:', error);
    }
};

// lấy sản phẩm theo id
const getCategoryById = async (id) => {
    try {
        const data = await categoryModel.findById(id);

        if (!data) {
            console.log('Không tìm thấy sản phẩm với ID đã cho');
            return null;
        }
        return data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
    }
};

const getAll = async (page, limit, keywords) => {
    try {
        page = parseInt(page) || 1
        limit = parseInt(limit) || 20
        let sort = { createdAt: -1 };
        let skip = (page - 1) * limit;

        let query = {
            name: { $regex: keywords, $options: 'i' } // Tìm kiếm theo tên sản phẩm
        };
        const data = await categoryModel
            .find(query )
            .limit(limit)
            .sort(sort)
            .skip(skip)

        const totalBrand = await categoryModel.countDocuments(query);

        // Trả về kết quả
        return {
            status: true,
            data: data,
            total: totalBrand,
            currentPage: page,
            totalPages: Math.ceil(totalBrand / limit), // Tính tổng số trang
        };
        return data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
    }
};

const getCategory = async () => {
    try {
        const data = await categoryModel.find({})
        return data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy sản phẩm:', error);
    }
};


module.exports = { insert, update, deleteById, getCategoryById, getAll, getCategory };