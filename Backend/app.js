const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const connectTODb = require('./db/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routerUser = require('./routes/user.routes')
const routerCaptain = require('./routes/captain.routes')
const app = express()

connectTODb()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',function(req,res){
    res.send('hello world')
})

app.use('/users' , routerUser)
app.use('/captain' , routerCaptain)
module.exports = app