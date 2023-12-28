const express = require("express");
// const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user")
const { register, login, getCurrent, logout } = require("../../controllers/auth")
const {authenticate} = require("../../middlewares")

const router = express.Router();

router.post("/login", authenticate, login)
router.post("/register", authenticate, register)
router.get("/current", authenticate, getCurrent)
router.post("/logout", authenticate, logout)

module.exports = router;