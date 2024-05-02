import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyDetails,
  updatePropertyDetails,
    updatePropertyImages,
  deleteProperty
} from "../controllers/property.controllers.js";
import { verifyJwt, authorizeRoles } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/create")
  .post(
    verifyJwt,
    authorizeRoles("OWNER","BROKER"),
    upload.array("images"),
    createProperty
  );
router.route("/p/:id").get(getPropertyDetails);
router.route("/all").get(getAllProperties);
router.route("/p/:id").put(verifyJwt, authorizeRoles('OWNER',"BROKER"), updatePropertyDetails);
router.route("/p/:id").patch(verifyJwt, authorizeRoles('OWNER'), upload.single('image'), updatePropertyImages);
router.route("/p/:id").delete(verifyJwt, authorizeRoles('OWNER'), deleteProperty);

export default router;
