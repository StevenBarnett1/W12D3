const express = require("express")
const router = express.Router()
const db = require("../db/models")
const bcrypt = require('bcryptjs');
const {User} = db
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const { check, validationResult } = require('express-validator')
const login = require("../auth.js")
const {getUserToken} = require("../auth")


router.get("/register",asyncHandler(async(req,res,next)=>{
    
}))


router.get("/log-in",asyncHandler(async(req,res,next)=>{

}))

router.post("/log-in",asyncHandler(async(req,res,next)=>{
    let {username,password} = req.body

}))

router.post("/register",asyncHandler(async(req,res,next)=>{
    console.log("users post route")
    let {username,password,email} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({username, password:hashedPassword, email})
    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });

}))

module.exports = router
