import express from "express";
import { checkToken, verifyToken } from "../middleware/rbacMiddleware.js";
import { login, logout, register, activateAccount, forgotPassword, resetPassword, changePassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/activate", activateAccount);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password/:id", checkToken, changePassword);

export default router;
