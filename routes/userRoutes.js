const express = require("express")
const { currentUser, loginUser, registerUser } = require("../controllers/userController")
const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", currentUser)

module.exports = router 