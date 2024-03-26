const express = require('express');
// const { CreateProductHB, getProductListHB } = require('../../controller/HBController/handlebars.product');
const { verifyAdminHB } = require('../../utils/verifyToken');
const { getProductListHB, CreateProductHB, getCreateProductHB, editProductGetHB } = require('../../controller/HBController/handlebars.product');

const productRouteHB = express.Router();

productRouteHB.get('/create-product', getCreateProductHB);
productRouteHB.post(
    '/create-product',
    verifyAdminHB,
    CreateProductHB
);

productRouteHB.get(
    '/edit-product/:id',
    verifyAdminHB,
    editProductGetHB
);
productRouteHB.get('/get-product-list', getProductListHB);


module.exports = { productRouteHB }