const express = require("express");
const { registerController, loginController } = require("../Controllers/authController");

const router = express.Router();

//register user
router.post('/register',registerController)

//login user
router.post('/login',loginController)



module.exports = router;