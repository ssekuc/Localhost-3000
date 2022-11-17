import { Router } from "express";
import { DisplayHomePage } from "./home.controller.js";

const router = Router();

router.get('/home', DisplayHomePage);
router.get('/', DisplayHomePage);

export default router;