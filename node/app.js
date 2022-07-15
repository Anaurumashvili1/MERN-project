const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./model/user')
const Calls = require("./model/calls")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "opopopopopopopo&&S&Spop"

const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://Ana:448848@cluster0.yuk4v.mongodb.net/?retryWrites=true&w=majority\n' +
    '\n').then(res => console.log("Connected to DB"))
    .catch(err => console.log(err));


app.post('/users', cors(), async (req, res) => {
    const {username, password: passwordString} = req.body;
    if (!username || typeof username !== "string") {
        return res.json({status: 'error', error: 'invalid username'})
    }
    if (typeof passwordString !== 'string' || passwordString.length < 6 || !passwordString.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
        return res.json({status: 'error', error: 'invalid password'})
    }
    //encrypted password
    const password = await bcrypt.hash(passwordString, 8);
    try {
        const response = await User.create({
            username, password
        })
        res.json({status: 'success'})
        console.log('user created')
    } catch (error) {
        if (error.code === 11000) {
            //duplicate key
            return res.json({status: 'error', error: 'Username already exists'})
        }
        throw error;
    }
})

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username}).lean();

    if (!user) {
        return res.json({status: "error", error: "invalid credentials"})
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET)
        res.json({status: "ok", data: token})
    }
    return res.json({status: "error", error: "invalid credentials"})

})

const callValidation=(req,res, next)=>{
    const {phone, name} = req.body
    if(phone.match(/^\d+$/) && name.match(/^[a-zA-Z\s]*$/)){
        next()
    }
    else res.json({status: "error", error:"invalid phone or name"})
}
app.post("/call",callValidation, async (req, res, next) => {
    const {authorization: token} = req.headers;
    const valid = jwt.verify(token, JWT_SECRET)
    if (valid) {
        try {
            const user = valid.username
            const timestamp = Date.now();
            const date = new Date(timestamp);
            const {name, phone} = req.body
            const response = await Calls.create({
                user, phone, name, timestamp:date
            })
            res.json({status: 'success',data:"calling"})
        } catch (error) {
            res.json({status: "error", error: "500"})
            console.log(error)
        }
    } else res.json({status: "error", error: 'invalid token'})
})

dotenv.config({path: './config.env'});
const PORT = process.env.PORT || 3001;

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`listening to the port ${PORT}`)
    } else console.log("server didn't start")
})