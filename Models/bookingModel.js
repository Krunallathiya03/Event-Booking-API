const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    event:{
        type:mongoose.Schema.ObjectId,
        ref:"Event",
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    ticketId:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Booking",bookingSchema)