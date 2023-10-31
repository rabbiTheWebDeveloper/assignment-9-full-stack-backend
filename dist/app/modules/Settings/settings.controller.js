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
exports.addSettings = exports.getSettings = void 0;
const responseHandler_1 = require("../../utlis/responseHandler");
const cloudinary_1 = __importDefault(require("../../utlis/cloudinary"));
const settings_model_1 = require("./settings.model");
const settings_service_1 = require("./settings.service");
const getSettings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, settings_service_1.getSettingDB)();
    (0, responseHandler_1.sendApiResponse)(res, 200, true, products);
});
exports.getSettings = getSettings;
const addSettings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { social_media, address, mobile, footer_about } = req.body;
    const result = yield cloudinary_1.default.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;
    const newProduct = new settings_model_1.Setting({
        social_media,
        address,
        mobile,
        footer_about,
        logo: imageUrl,
    });
    const product = yield (0, settings_service_1.createSettingFromDB)(newProduct);
    (0, responseHandler_1.sendApiResponse)(res, 200, true, product);
});
exports.addSettings = addSettings;
