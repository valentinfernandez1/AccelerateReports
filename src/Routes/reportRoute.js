import express from "express";
import reportController from "../Controllers/reportController.js";
const router = express.Router();

router.get("/getReports", reportController.getReports);
router.get("/getAllEnvirionments", reportController.getAllEnvirionments);
router.get("/getAllMicroservices", reportController.getAllMicroservices);
router.get("/getEntityData", reportController.getAllEntities);
router.get("/getTimeTable", reportController.getTimeTable);
router.get("/getCapabilities", reportController.getCapabilities);

router.post("/createReport", reportController.createReport);

export default router;
