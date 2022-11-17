import { Router } from "express";
import { DisplayActiveListPage, DisplayAddPage, DisplayDetailPage, DisplayPastListPage, ProcessAddTournament } from "./game.controller.js";

const router = Router();

router.get('/add', DisplayAddPage);
router.post('/add', ProcessAddTournament);
router.get('/active', DisplayActiveListPage);
router.get('/past', DisplayPastListPage);
router.get('/detail/:id', DisplayDetailPage);

export default router;