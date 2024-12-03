const mongoose = require("mongoose")

const connectDB = async () =>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("database connect thai gyo...")
    }
    catch(error){
        console.log("Database connect nathi thyo....",error)
    }
}

module.exports = connectDB;