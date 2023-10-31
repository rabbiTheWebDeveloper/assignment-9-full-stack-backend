import { Router } from "express";
import { bannerDelete, createBanner, getAllBanner, getBannerById, updateBanner} from "./banner.controller";
import imageUpload from "../../middleware/imageUpload";
import { auth } from "../../middleware/AuthVerifyMiddleware";

const router:Router = Router();

router.get("/allBanner", getAllBanner);
router.get("/bannerDetails/:id", getBannerById)
router.get("/banner-delete/:id",auth, bannerDelete)
router.post("/addBanner",imageUpload.single('image'), auth, createBanner)
router.post("/update-banner/:id",imageUpload.single('image'), auth, updateBanner)

export default router;