const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const userModel = require('../Models/userModel');

//---------------------------------register-----------------------------------------
const registerController = async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        //validation
        if(!name || !email || !password || !role ){
            return res.status(400).json({message:"Please provide all fields..."})
        }

        //check user
        const existuser = await userModel.findOne({ email })
        if(existuser)
            return res.status(400).json({message:"You are already register..."})

        //hash password
        const hash = await bcrypt.hash(password,10);

        //create user
        const user = await userModel.create({name,email,password:hash,role})
        await user.save();
        res.status(200).json({message:"user registerd sucessfully....",user})

    }
    catch(error){
        console.log(error)
        res.status(400).json({message:"Error in register api...",error})

    }
}


//----------------------------------------------login-------------------------------------
const loginController = async(req,res)=>{
    try{
        const {email ,password} =req.body;

        //validation
        if(!email || !password)
            return res.status(400).send({ message: "Email and password are required...." });

        //check user
        const user = await userModel.findOne({ email })
        if(!user)
            return res.status(400).json({message:"user not found"})

        //compare password | check user
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).json({message:"Password are not match"})
        }

        //token
        const token = JWT.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
        res.status(200).send({message:"login sucessfully....",token,user})

    }
     catch(error){
        console.log(error)
        res.status(400).json({message:"Error in register api...",error})

    }
    
}


module.exports = {registerController,loginController}