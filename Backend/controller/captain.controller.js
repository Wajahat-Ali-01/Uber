const blacklistTokenModel = require("../model/blacklistToken.Model");
const captainModel = require("../model/captain.model");
const captainServices = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(401).json({ error: error.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });
  if (isCaptainAlreadyExist) {
    return res.status(401).json({ message: "Captain already exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);
  const captain = await captainServices.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password:hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  res.status(200).json({ token, captain });
};

module.exports.loginCaptain = async (req,res,next)=>{
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(400).json({error:error.array()})
  }

  const {email , password} = req.body

  const captain  = await captainModel.findOne({email}).select('+password')

  if(!captain){
    return res.status(401).json({message:'Invalid Email or Password ha'})
  }

  const isMatch = await captain.comparePassword(password)

  if(!isMatch){
    return res.status(401).json({massage:'Invaild Email or Password'})
  }

  const token = captain.generateAuthToken()
  res.cookie('token' , token)
  res.status(200).json({token , captain})
}

module.exports.getCaptainProfile = async (req,res,next)=>{
  return res.status(200).json({Captain:req.captain})
}

module.exports.logoutCaptain = async(req,res,next)=>{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

  await blacklistTokenModel.create({token})

  res.clearCookie('token')
  res.status(200).json({massage:'Logout successfully' , user:req.Captain})
}