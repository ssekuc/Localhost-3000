import { Router } from "express";
import { AdminAuthGuard } from "../utils/auth.js";
import { DisplayAdminHomePage } from "./admin.controller.js";

const router = Router();

router.get('/admin', AdminAuthGuard, DisplayAdminHomePage);

export default router;