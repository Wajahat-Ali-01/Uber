const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const connectTODb = require('./db/db')
const cors = require('cors')
const router = require('./routers/user.route')
const app = express()

connectTODb()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',function(req,res){
    res.send('hello world')
})

app.use('/users' , router)

module.exports = app