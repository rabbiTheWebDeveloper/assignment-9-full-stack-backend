"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.productDelete = exports.createProduct = exports.getProductByFilter = exports.getProductById = exports.getAllProducts = void 0;
const product_service_1 = require("./product.service");
const responseHandler_1 = require("../../utlis/responseHandler");
const cloudinary_1 = __importDefault(require("../../utlis/cloudinary"));
const product_model_1 = require("./product.model");
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_service_1.getAllProductsFromDB)();
    (0, responseHandler_1.sendApiResponse)(res, 200, true, products);
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield (0, product_service_1.getProductByIdFromDB)(id);
    (0, responseHandler_1.sendApiResponse)(res, 200, true, product);
});
exports.getProductById = getProductById;
const getProductByFilter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy } = req.params;
    const product = yield (0, product_service_1.getFilterProduct)(sortBy);
    (0, responseHandler_1.sendApiResponse)(res, 200, true, product);
});
exports.getProductByFilter = getProductByFilter;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category_id, brand, rating, sku, price, discount, color, size, qtn, description } = req.body;
    try {
        const result = yield cloudinary_1.default.uploader.upload(req.file.path);
        const imageUrl = result.secure_url;
        const newProduct = new product_model_1.Product({
            name,
            category_id,
            sku,
            brand,
            rating,
            price,
            discount,
            color,
            qtn,
            size,
            description,
            product_image: imageUrl
        });
        const product = yield (0, product_service_1.createProductFromDB)(newProduct);
        (0, responseHandler_1.sendApiResponse)(res, 200, true, product);
    }
    catch (error) {
        console.error("An error occurred:", error);
        (0, responseHandler_1.sendApiResponse)(res, 500, false, "Internal Server Error");
    }
});
exports.createProduct = createProduct;
const productDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, product_service_1.productdelete)(id);
    (0, responseHandler_1.sendApiResponse)(res, 200, true, result);
});
exports.productDelete = productDelete;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category_id, brand, rating, sku, price, discount, color, size, qtn, description } = req.body;
    try {
        const productId = req.params.id;
        const existingProduct = yield product_model_1.Product.findById(productId);
        let imageUrl = existingProduct.image;
        if (req.file) {
            const result = yield cloudinary_1.default.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const newProduct = new product_model_1.Product({
            name,
            category_id,
            sku,
            brand,
            rating,
            price,
            discount,
            color,
            qtn,
            size,
            description,
            product_image: imageUrl
        });
        const updateProduct = {
            name: newProduct.name,
            category_id: newProduct.category_id,
            sku: newProduct.sku,
            brand: newProduct.brand,
            rating: newProduct.rating,
            price: newProduct.price,
            discount: newProduct.discount,
            color: newProduct.color,
            qtn: newProduct.qtn,
            size: newProduct.size,
            description: newProduct.description,
            product_image: newProduct.product_image
        };
        const product = yield (0, product_service_1.updateProductFromDB)(productId, updateProduct);
        (0, responseHandler_1.sendApiResponse)(res, 200, true, product);
    }
    catch (error) {
        console.error("An error occurred:", error);
        (0, responseHandler_1.sendApiResponse)(res, 500, false, "Internal Server Error");
    }
});
exports.updateProduct = updateProduct;