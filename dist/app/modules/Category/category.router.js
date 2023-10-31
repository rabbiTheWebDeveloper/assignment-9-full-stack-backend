"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const AuthVerifyMiddleware_1 = require("../../middleware/AuthVerifyMiddleware");
const router = (0, express_1.Router)();
router.get("/", category_controller_1.getCategorys);
router.get("/:id", category_controller_1.getCategorysByID);
router.post("/create", AuthVerifyMiddleware_1.auth, category_controller_1.addCategory);
router.post("/update/:id", AuthVerifyMiddleware_1.auth, category_controller_1.updateCategory);
router.get("/create-delete/:id", AuthVerifyMiddleware_1.auth, category_controller_1.deleteCategory);
exports.default = router;