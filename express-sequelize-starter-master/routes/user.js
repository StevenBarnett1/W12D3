const express = require("express")
const router = express.Router()
const db = require("../db/models")
const {User} = db
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const { check, validationResult } = require('express-validator')
const login = require("../auth.js")

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

}))

module.exports = router
