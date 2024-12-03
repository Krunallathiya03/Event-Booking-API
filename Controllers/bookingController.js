const { v4: uuidv4 } = require('uuid');
const eventModel = require('../Models/eventModel');
const bookingModel = require('../Models/bookingModel');


const bookEventController = async (req,res) =>{
    try{
        const {eventId} = req.body;
        //validation
        const event  = await eventModel.findById(eventId)
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const ticketId = uuidv4();
        const booking = new bookingModel({event:eventId, user:req.user.id, ticketId})
        await booking.save();
        res.status(201).json({message:"Booking Sucessfully....",ticketId,booking})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"error in book event api....",error})
    }
}


module.exports = bookEventController




