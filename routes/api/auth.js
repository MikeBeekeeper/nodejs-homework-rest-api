const express = require("express");
const { schemas } = require("../../models/user")
const { register, login, getCurrent, logout } = require("../../controllers/auth")
const {authenticate} = require("../../middlewares")

const router = express.Router();

router.post("/login", login)
router.post("/register", register)
router.get("/current", authenticate, getCurrent)
router.post("/logout", authenticate, logout)

module.exports = router;