import { Router } from "express";
import {
  getAnalyzedProfile,
  getAnalyzedProfiles,
  storeProfileInfo,
} from "../controllers/analyze.controllers.js";

const router = Router();

router.post("/", storeProfileInfo);
router.get("/", getAnalyzedProfiles);
router.get("/:id", getAnalyzedProfile);

export default router;
