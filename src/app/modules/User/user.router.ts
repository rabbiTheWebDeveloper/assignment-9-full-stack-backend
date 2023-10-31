import { Router } from "express";
import { login, registration, userUpdate } from "./user.controller";

const router:Router = Router();

router.post("/registration" ,registration);
router.post("/login",login);
router.post("/user-update/:id",userUpdate);
// router.post("/profileUpdate",AuthVerifyMiddleware,UsersController.profileUpdate);
// router.get("/profileDetails",AuthVerifyMiddleware,UsersController.profileDetails);

export default router;