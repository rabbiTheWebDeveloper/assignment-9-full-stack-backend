import { Router } from "express";
import {createReview, getAllReview, getReviewById, updateReview } from "./review.controller";
import imageUpload from "../../middleware/imageUpload";


const router:Router = Router();

router.get("/all-reviews",getAllReview);
router.get("/review-details/:id", getReviewById)
router.post("/add-review",imageUpload.single('image'), createReview)
router.post("/update-review/:id",imageUpload.single('image'), updateReview)

export default router;