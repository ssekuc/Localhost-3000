import { Router } from "express";
import { AuthGuard } from "../utils/auth.js";
import { DecideWinner, DisplayActiveListPage, DisplayAddPage, DisplayDetailPage, DisplayPastListPage, ProcessAddTournament } from "./game.controller.js";

const router = Router();

router.get('/add',AuthGuard , DisplayAddPage);
router.post('/add', AuthGuard, ProcessAddTournament);
router.get('/active', DisplayActiveListPage);
router.get('/past', DisplayPastListPage);
router.get('/detail/:id', DisplayDetailPage);

router.put('/api/decidewinner/:id', DecideWinner);

export default router;