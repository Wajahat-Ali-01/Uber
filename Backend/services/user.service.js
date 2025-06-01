// const userModel = require('../model/user.model')

// module.exports.createUser = async function({firstname , lastname , email , password}){
//     if(!firstname || !email || !password){
//         throw new Error('All feild are required')
//     }

//     const user = userModel.create({
//         fullname:{
//             firstname,
//             lastname
//         },
//         email,
//         password
//     })

//     return user
// }


const userModel = require('../model/user.model')

module.exports.createUser = async function ({ firstname, lastname, email, password }) {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required')
    }

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user
}
