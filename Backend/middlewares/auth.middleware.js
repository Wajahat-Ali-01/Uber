const captainModel = require("../model/captain.model");
const blacklistTokenModel = require("../model/blacklistToken.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklist = await blacklistTokenModel.findOne({ token: token });
  console.log(isBlacklist);
  if (isBlacklist) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res , next)=>{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if(!token){
    return res.status(401).json({message:"Unauthorized 0"})
  }

  const isBlacklist = await blacklistTokenModel.findOne({token})

  
  if(isBlacklist){
    return res.status(401).json({message:"Unauthorized k"})
  }

  try{
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded , "i");
    
    const captain = await captainModel.findById(decoded._id)
    req.captain = captain
    return next()
  }catch(error){
    return res.status(401).json({message:"Unauthorized llll"})
  }
}