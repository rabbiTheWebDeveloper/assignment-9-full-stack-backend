import { Router } from "express";
import { createProduct, getAllProducts, getProductByFilter, getProductById, productDelete, updateProduct} from "./product.controller";
import imageUpload from "../../middleware/imageUpload";
import { auth } from "../../middleware/AuthVerifyMiddleware";

const router:Router = Router();

router.get("/allProducts",getAllProducts);
router.get("/details/:id", getProductById)
router.get("/product-filter/:sortBy", getProductByFilter)
router.post("/addProducts", imageUpload.single('image') ,auth ,createProduct)
router.post("/product-update/:id", imageUpload.single('product_image') , updateProduct)
router.get("/product-delete/:id",auth, productDelete);

export default router;