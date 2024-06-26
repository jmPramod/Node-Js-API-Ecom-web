const createError = require("../../utils/errorHandle");
const productsSchema = require("../../models/ProductSchema");



const CreateProductHB = async (req, res, next) => {
    try {
        const {
            id,
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images,
        } = req.body;

        let error = [];
        let newProduct = await new productsSchema({
            title,
            id,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images,
        }).save();


        // let productList = await productsSchema.find().lean();

        res.render('products/getProductList', { newProduct, style: "getProductList.css" });

    } catch (err) {

        req.flash('Error_msg', err);
    }
};


const getProductListHB = async (req, res, next) => {
    try {
        if (req.body.filter) {
            let productList = await productsSchema.find({
                $or: [{ title: { $regex: req.body.filter, $options: "i" } }

                    // , { price: parseFloat(req.bo dy.filter) }

                ]
            }).lean();
            if (productList.length === 0) {
                productList = [{
                    title: 'Product not Found',

                }]

            }
            res.render('products/getProductList', { productList, style: "getProductList.css", listProduct: true, filterValue: req.body.filter });


        }
        else {

            let productList = await productsSchema.find().lean();

            res.render('products/getProductList', { productList, style: "getProductList.css", listProduct: true });
        }
    } catch (error) {
        console.log("error", error);
        req.flash('Error_msg', error);
    }
};

const getSingleProductHB = async (req, res, next) => {
    try {
        const productDetails = await productsSchema.findById({
            _id: req.params.id,
        });
    } catch (err) {

        req.flash('Error_msg', err);
    }
};



const searchProductHB = async (req, res, next) => {
    try {
        const searchTerm = req.query
        const productDetails = await productsSchema.find({
            title: searchTerm
        })
        if (!productDetails) {
            return next(createError(404, 'no product found'));

        }
    }
    catch (err) {

        req.flash('Error_msg', err);
    }
}

const getCreateProductHB = async (req, res, next) => {
    try {

        res.render('products/productCreate', { style: "createProduct.css" });
    }
    catch (err) {

        req.flash('Error_msg', err);
    }
}
const editProductGetHB = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await productsSchema.findById(id).lean()
        res.render('products/productCreate', { mode: 'edit', data: data, style: "createProduct.css" });


    } catch (error) {

        req.flash('Error_msg', error);
    }


}
const editProductPostHB = async (req, res, next) => {
    try {
        if (req.body.images && typeof req.body.images === 'string') {
            // Split by spaces or new lines (regex \s+ matches any whitespace)
            req.body.images = req.body.images.split(/\s+/).map(url => url.trim());
        }

        const { id } = req.params;
        const updateData = await productsSchema.findByIdAndUpdate(id, req.body, { new: true });
   
        let productList = await productsSchema.find().lean();
        res.render('products/getProductList', { productList, style: "getProductList.css", listProduct: true });

    } catch (error) {
        next(error);
    }
}

module.exports = {

    getSingleProductHB,
    CreateProductHB,
    getProductListHB,
    getCreateProductHB,
    searchProductHB,
    editProductGetHB,
    editProductPostHB
};
