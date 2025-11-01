import express from "express";
import { reverseGeocode } from "../controllers/geocodeController.js";
const router = express.Router();

router.get("/", reverseGeocode);

export default router;
