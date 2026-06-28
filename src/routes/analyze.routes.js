import { Router } from "express";
import {
  getAnalyzedProfile,
  getAnalyzedProfiles,
  storeAnalyzedProfileInfo,
} from "../controllers/analyze.controllers.js";

const router = Router();

router.post("/", storeAnalyzedProfileInfo);
router.get("/", getAnalyzedProfiles);
router.get("/:id", getAnalyzedProfile);

export default router;
