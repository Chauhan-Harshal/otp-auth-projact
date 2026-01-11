import express from "express";
import { login, logout, signUp, verifyOtp, home } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

export const router = express.Router();

router.get("/home", verifyJWT, home)
router.post("/signup", signUp);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/logout", verifyJWT, logout);