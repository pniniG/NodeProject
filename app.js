const express = require('express')
const app = express()
const jwt = require("jsonwebtoken");

const router = require('./routes/api')

const dotenv = require('dotenv')
dotenv.config()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

const mongoose = require('mongoose')
app.use('/', router)
const connectionParms = {
    newUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:true,
}
app.listen(4999, () => {
    console.log("listening in port 5000");
})

mongoose.connect(process.env.DB_CONNECT, connectionParms)
    .then(() => {
        console.log("connected to db")
    })
    .catch((err) => {
        console.log("errore:" + err);
    })






    