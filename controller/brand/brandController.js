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


module.exports = { insert, update, deleteById, getBrandById, getBrand };