const express = require("express");
const { addEventController, 
        updateEventController, 
        deleteEventController,
        getEventsController} = require("../Controllers/eventController");
const { authenticate, isOrganizer } = require("../Middelware/authMiddleware");

const router = express.Router();

//create event
router.post('/',authenticate,addEventController)

//get events
router.get('/getall',getEventsController)

//update event
router.put('/:id',authenticate,updateEventController)

//delete
router.delete('/delete/:id',authenticate,deleteEventController)



module.exports = router;