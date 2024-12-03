const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({

    title:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String

    },
    date: {
        type: Date,
        required: true
    },
    organizer:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }


}, { timestamps: true })


module.exports = mongoose.model("Event", eventSchema)