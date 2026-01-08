import { Router } from "express";
import {getApprovedReviewsPublic} from "../controllers/Reviewcontroller/reviewcontroller.js";

const router = Router();




router.get("/review",getApprovedReviewsPublic)
export default router;