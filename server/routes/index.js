import express from "express";
import {
  getUserDetails,
  getFileUploadDetails,
} from "../controllers/loginController";
import { getPatientSearchResults } from "../controllers/patientSearchController";

const router = express.Router();

router.post("/login", getUserDetails);
router.post("/fileUpload", getFileUploadDetails);

router.post("/patientSearch", getPatientSearchResults);

module.exports.router = router;
