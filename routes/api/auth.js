const express = require("express");
const { schemas } = require("../../models/user");
const{registerUserschema, loginUserSchema, verifyEmail} = schemas
const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  examByVerificationToken,
  reapeatingExam,
} = require("../../controllers/auth");
const { authenticate, upload, validateBody } = require("../../middlewares");


const router = express.Router();

router.post("/login", validateBody(loginUserSchema), login);
router.post("/register", validateBody(registerUserschema), register);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", examByVerificationToken);
router.post("/verify", validateBody(verifyEmail), reapeatingExam);

module.exports = router;
