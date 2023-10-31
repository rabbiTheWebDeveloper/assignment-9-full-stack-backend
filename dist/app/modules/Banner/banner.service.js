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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBannerFromDB = exports.bannerdelete = exports.createBannerFromDB = exports.getBannerByIdFromDB = exports.getAllBannerFromDB = void 0;
const banner_model_1 = require("./banner.model");
const getAllBannerFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return banner_model_1.Banner.find().sort({ createdAt: -1, });
});
exports.getAllBannerFromDB = getAllBannerFromDB;
const getBannerByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return banner_model_1.Banner.find({ _id: id });
});
exports.getBannerByIdFromDB = getBannerByIdFromDB;
const createBannerFromDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = new Product(data); //User -> class  user -> instance
    yield data.save();
    return data;
});
exports.createBannerFromDB = createBannerFromDB;
const bannerdelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = new Product(data); //User -> class  user -> instance
    return banner_model_1.Banner.deleteOne({ _id: id });
});
exports.bannerdelete = bannerdelete;
const updateBannerFromDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield banner_model_1.Banner.updateOne({ _id: id }, { $set: data }, { new: true });
        if (result.modifiedCount === 0) {
            throw new Error("Banner not found or not modified");
        }
        const updatedDocument = yield banner_model_1.Banner.findById(id);
        if (!updatedDocument) {
            throw new Error("Banner not found");
        }
        return updatedDocument;
    }
    catch (error) {
        console.error("Error updating Banner:", error);
        throw error;
    }
});
exports.updateBannerFromDB = updateBannerFromDB;
