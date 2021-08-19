const express = require("express")
const router = express.Router()
const db = require("../db/models")
const bcrypt = require('bcryptjs');
const {User} = db
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const { check, validationResult } = require('express-validator')
const login = require("../auth.js")


'88b233d929005b7097f4e07f19957a83db027322ccf524e7f4928bce956bf5db'



router.get("/register",asyncHandler(async(req,res,next)=>{
    if(req.session.auth){
        res.redirect("/")
    } else {
        //res.render("register")
    }
}))


router.get("/login",asyncHandler(async(req,res,next)=>{
    if(req.session.auth){
        res.redirect("/")
    } else {
        //res.render("login")
    }
}))

router.post("/login",asyncHandler(async(req,res,next)=>{
    let {username,password} = req.body

}))

router.post("/register",asyncHandler(async(req,res,next)=>{
    let {username,password,email} = req.body
    const hashedPassword = bcrypt.hash(password, 10);
    User.create ({username, password:hashedPassword, email})

    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });

}))

module.exports = router
