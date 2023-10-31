"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const banner_controller_1 = require("./banner.controller");
const imageUpload_1 = __importDefault(require("../../middleware/imageUpload"));
const AuthVerifyMiddleware_1 = require("../../middleware/AuthVerifyMiddleware");
const router = (0, express_1.Router)();
router.get("/allBanner", banner_controller_1.getAllBanner);
router.get("/bannerDetails/:id", banner_controller_1.getBannerById);
router.get("/banner-delete/:id", AuthVerifyMiddleware_1.auth, banner_controller_1.bannerDelete);
router.post("/addBanner", imageUpload_1.default.single('image'), AuthVerifyMiddleware_1.auth, banner_controller_1.createBanner);
router.post("/update-banner/:id", imageUpload_1.default.single('image'), AuthVerifyMiddleware_1.auth, banner_controller_1.updateBanner);
exports.default = router;
