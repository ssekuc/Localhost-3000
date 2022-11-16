import { Router } from "express";
import { DisplayLoginPage, DisplayRegisterPage, ProcessLogin, ProcessLogout, ProcessRegister } from "./user.controller.js";

const router = Router();

router.get('/login', DisplayLoginPage);

router.get('/register', DisplayRegisterPage);

router.post('/login', ProcessLogin);

router.post('/register', ProcessRegister);

router.get('/logout', ProcessLogout);

export default router;