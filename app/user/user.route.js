import { Router } from "express";
import { AuthGuard } from "../utils/auth.js";
import { DisplayLoginPage, DisplayRegisterPage, ProcessLogin, ProcessLogout, ProcessRegister } from "./user.controller.js";

const router = Router();

router.get('/login', DisplayLoginPage);

router.get('/register', DisplayRegisterPage);

router.post('/login', ProcessLogin);

router.post('/register', ProcessRegister);

router.get('/logout', AuthGuard, ProcessLogout);

export default router;