const JWT = require("jsonwebtoken")

exports.authenticate = (req,res,next)=>{
    const token = req.header("authorization")?.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const verified = JWT.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
      } catch (error) {
        res.status(400).json({ message: "Invalid token" });
      }
}


exports.isOrganizer = (req,res,next)=>{
    if(req.user.role != "organizer"){
        return res.status(403).json({message:"Access denied "})
        next();
    }
}
