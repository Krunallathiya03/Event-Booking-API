const express = require("express");
const bookEventController = require("../Controllers/bookingController");
const { authenticate } = require("../Middelware/authMiddleware");

const router = express.Router();


//book event
router.post('/add',authenticate, bookEventController)



module.exports = router