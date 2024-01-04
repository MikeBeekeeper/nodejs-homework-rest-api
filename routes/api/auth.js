const express = require("express");
const { schemas } = require("../../models/user")
const { register, login, getCurrent, logout, updateAvatar } = require("../../controllers/auth")
const {authenticate, upload} = require("../../middlewares")

const router = express.Router();

router.post("/login", login)
router.post("/register", register)
router.get("/current", authenticate, getCurrent)
router.post("/logout", authenticate, logout)
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar)

module.exports = router;