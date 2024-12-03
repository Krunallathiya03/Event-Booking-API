const eventModel = require("../Models/eventModel");

const addEventController = async (req,res)=>{
    try{
        const{ title, description , date} = req.body;

        //validation
        if(!title || !description || !date){
            return res.status(400).json({message:"Please provide all fields..."})
        }

        const event = new  eventModel({title,description,date,organizer:req.user.id})
        await event.save();
        res.status(200).json({message:"Event added",event})
    }
    catch(error){
        console.log(error)
        res.status(400).json({message:"Error in add event api...",error})

    }
}

//get all events
const   getEventsController = async (req,res)=>{
    try{
        const getEvent = await eventModel.find();
        if(!getEvent){
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({totelEvents:getEvent.length,getEvent})

    }
    catch(error){
        console.log(error)
        res.status(400).json({message:"Error in get event api...",error})

    }
    
}

//update event
const updateEventController = async(req,res)=>{
    try{
        const updateEvent = await eventModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updateEvent){
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({message:"event update sucessfully...",updateEvent})
    }
    catch(error){
        console.log(error)
        res.status(400).json({message:"Error in update event api...",error})

    }

}

//delete event
const deleteEventController = async(req,res)=>{
    try{
        const deleteEvent = await eventModel.findByIdAndDelete(req.params.id)
        if(!deleteEvent){
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({message:"event delete sucessfully...",deleteEvent})

    }
    catch(error){
        console.log(error)
        res.status(400).json({message:"Error in delete event api...",error})

    }

}


module.exports = {addEventController,
                  updateEventController,
                  deleteEventController,
                  getEventsController
}