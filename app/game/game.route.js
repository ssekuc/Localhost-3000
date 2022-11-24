import { Router } from "express";
import { AuthGuard } from "../utils/auth.js";
import { DisplayActiveListPage, DisplayAddPage, DisplayDetailPage, DisplayPastListPage, ProcessAddTournament } from "./game.controller.js";

const router = Router();

router.get('/add',AuthGuard , DisplayAddPage);
router.post('/add', AuthGuard, ProcessAddTournament);
router.get('/active', DisplayActiveListPage);
router.get('/past', DisplayPastListPage);
router.get('/detail/:id', DisplayDetailPage);

export default router;