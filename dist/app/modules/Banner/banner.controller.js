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
exports.updateBanner = exports.bannerDelete = exports.createBanner = exports.getBannerById = exports.getAllBanner = void 0;
const banner_service_1 = require("./banner.service");
const responseHandler_1 = require("../../utlis/responseHandler");
const banner_model_1 = require("./banner.model");
const cloudinary_1 = __importDefault(require("../../utlis/cloudinary"));
const getAllBanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, banner_service_1.getAllBannerFromDB)();
    (0, responseHandler_1.sendApiResponse)(res, 200, true, products);
});
exports.getAllBanner = getAllBanner;
const getBannerById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield (0, banner_service_1.getBannerByIdFromDB)(id);
    (0, responseHandler_1.sendApiResponse)(res, 200, true, product);
});
exports.getBannerById = getBannerById;
const createBanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { header, subheader } = req.body;
    const result = yield cloudinary_1.default.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;
    const newProduct = new banner_model_1.Banner({
        header,
        subheader,
        image: imageUrl,
    });
    const product = yield (0, banner_service_1.createBannerFromDB)(newProduct);
    (0, responseHandler_1.sendApiResponse)(res, 200, true, product);
});
exports.createBanner = createBanner;
const bannerDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, banner_service_1.bannerdelete)(id);
    (0, responseHandler_1.sendApiResponse)(res, 200, true, result);
});
exports.bannerDelete = bannerDelete;
const updateBanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { header, subheader } = req.body;
    const bannerId = req.params.id;
    const existingProduct = yield banner_model_1.Banner.findById(bannerId);
    let imageUrl = existingProduct.image;
    if (req.file) {
        const result = yield cloudinary_1.default.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
    }
    const newBanner = new banner_model_1.Banner({
        header,
        subheader,
        image: imageUrl,
    });
    const updatePayload = {
        header: newBanner.header,
        subheader: newBanner.subheader,
        image: newBanner.image,
    };
    const product = yield (0, banner_service_1.updateBannerFromDB)(bannerId, updatePayload);
    (0, responseHandler_1.sendApiResponse)(res, 200, true, product);
});
exports.updateBanner = updateBanner;
