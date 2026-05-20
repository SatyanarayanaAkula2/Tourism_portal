import express from "express";
import { getPackages,getPackagesByDestination,createPackage } from "../controllers/package_controller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router=express.Router();

router.get('/getpackages',authMiddleware, getPackages);
router.get('/destination/:id',authMiddleware,getPackagesByDestination);
router.post('/addpackage',authMiddleware,createPackage);

export default router;