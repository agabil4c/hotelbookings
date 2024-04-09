import express from "express";
import { login, logout, register, activateAccount, forgotPassword, resetPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/activate", activateAccount);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
