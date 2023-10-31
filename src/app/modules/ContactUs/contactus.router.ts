import { Router } from "express";
import { createContract, getAllContact, getContactById} from "./contactus.controller";


const router:Router = Router();

router.get("/all-contact-us",getAllContact);
router.get("/contact-us-details/:id", getContactById)
router.post("/contact-us", createContract)

export default router;