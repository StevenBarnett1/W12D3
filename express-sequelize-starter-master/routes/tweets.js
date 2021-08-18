const express = require("express")
const router = express.Router()
const db = require("../db/models")
const {Tweet} = db
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get("/", asyncHandler(async (req, res) => {
    let tweets = await Tweet.findAll()
    res.json(tweets)
}));

router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    let tweet = await Tweet.findByPk(req.params.id)
    res.json(tweet)
}));

router.post("/", asyncHandler(async (req, res) => {
    let {message} = req.body
    Tweet.create({message:message})
    res.json()
}));

router.put("/", asyncHandler(async (req, res) => {
    let tweets = await Tweet.findAll()
    res.json(tweets)
}));

router.delete("/", asyncHandler(async (req, res) => {
    let tweets = await Tweet.findAll()
    res.json(tweets)
}));




module.exports = router
