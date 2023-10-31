import { Router } from "express";
import { addSettings, getSettings } from "./settings.controller";
import imageUpload from "../../middleware/imageUpload";
const router:Router = Router();

router.get("/settings",getSettings);
router.post("/setting-update",imageUpload.single('image'), addSettings)

export default router;