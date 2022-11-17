import { Router } from "express";
import { DisplayActiveListPage, DisplayAddPage, DisplayPastListPage } from "./game.controller.js";

const router = Router();

router.get('/add', DisplayAddPage);
router.get('/active', DisplayActiveListPage);
router.get('/past', DisplayPastListPage);

export default router;