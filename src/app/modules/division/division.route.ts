import { Router } from "express";
import { DivisionController } from "./division.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createDivisionZodSchema,
  updateDivisionZodSchema,
} from "./division.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(createDivisionZodSchema),
  DivisionController.createDivision
);

router.get("/", DivisionController.getAllDivision);
router.get("/:slug", DivisionController.getSingleDivision);
router.patch(
  "/:divisionId",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(updateDivisionZodSchema),
  DivisionController.updateDivision
);

router.delete(
  "/:divisionId",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DivisionController.deleteDivision
);

export const DivisionRouters = router;
