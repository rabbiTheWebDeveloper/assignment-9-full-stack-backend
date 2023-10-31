"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const dbConnection_1 = require("./app/utlis/dbConnection");
const product_router_1 = __importDefault(require("./app/modules/Product/product.router"));
const user_router_1 = __importDefault(require("./app/modules/User/user.router"));
const banner_router_1 = __importDefault(require("./app/modules/Banner/banner.router"));
const blog_router_1 = __importDefault(require("./app/modules/Blog/blog.router"));
const order_router_1 = __importDefault(require("./app/modules/Order/order.router"));
const review_router_1 = __importDefault(require("./app/modules/Review/review.router"));
const contactus_router_1 = __importDefault(require("./app/modules/ContactUs/contactus.router"));
const settings_router_1 = __importDefault(require("./app/modules/Settings/settings.router"));
const category_router_1 = __importDefault(require("./app/modules/Category/category.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parse data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// db connection
(0, dbConnection_1.dbConnection)();
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/v1/product", product_router_1.default);
app.use("/api/v1/category", category_router_1.default);
app.use("/api/v1", user_router_1.default);
app.use("/api/v1", banner_router_1.default);
app.use("/api/v1", blog_router_1.default);
app.use("/api/v1/order", order_router_1.default);
app.use("/api/v1/review", review_router_1.default);
app.use("/api/v1/contact", contactus_router_1.default);
app.use("/api/v1", settings_router_1.default);
exports.default = app;
