import { Router } from "express";
import { DisplayAdminHomePage } from "./admin.controller.js";

const router = Router();

router.get('/admin', DisplayAdminHomePage);

export default router;