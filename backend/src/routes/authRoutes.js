import express from "express";
import { LogIn, LogOut, SignUp } from "../controllers/authController.js";
import { loginValidation, signupValidation } from "../validators/authValidators.js";
import { validate } from "../middlewares/validate.js";


const router = express.Router();

router.post("/signup", signupValidation, validate, SignUp);

router.post("/login", loginValidation, validate, LogIn);

router.post("/logout", LogOut);

export default router;