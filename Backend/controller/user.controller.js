// const userModel = require('../model/user.model')
// const userServices = require('../services/user.service')
// const { validationResult } = require('express-validator')

// module.exports.registerUser = async (req,res,next)=>{
//     const error = validationResult(req)
//     if(!error.isEmpty()){
//         return res.status(400).json({error:error.array()})
//     }

//     const {fullname , email , password} = req.body

//     const hashPassword = await userModel.hashPassword(password)

//     const user = await userServices.createUser({
//         firstname:fullname.firstname,
//         lastname:fullname.lastname,
//         email,
//         password:hashPassword
//     })

//     const token = user.generateAuthToken()

//     res.status(201).json({token , user})
// }

const userModel = require('../model/user.model')
const userServices = require('../services/user.service')
const { validationResult } = require('express-validator')

module.exports.registerUser = async (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { fullname, email, password } = req.body

    const hashPassword = await userModel.hashPassword(password)

    const user = await userServices.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    })

    const token = user.generateAuthToken()

    res.status(201).json({ token, user })
}
