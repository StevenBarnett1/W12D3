const express = require("express")
const router = express.Router()
const db = require("../db/models")
const {Tweet} = db
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const { requireAuth } = require("../auth");


router.use(requireAuth);


router.get("/", asyncHandler(async (req, res) => {
    console.log("HELLO")
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

router.put("/:id(\\d+)", asyncHandler(async (req, res) => {
    let tweetId = req.params.id;
    let tweet = await Tweet.findByPk(tweetId);

    if(!tweet) {
        throw Error("Tweet Not Found")
    } else {
        // const tweetU = await Tweet.update(
        //     { message: req.body.message },
        //     { where: { id: tweetId}}
        // )
        tweet.message = req.body.message
        tweet.save()
        res.json(tweet)
    }

}));

router.delete("/:id(\\d+)", asyncHandler(async (req, res) => {
    let tweetId = req.params.id;
    let tweet = await Tweet.findByPk(tweetId);

    if(!tweet) {
        throw Error("Tweet Not Found")
    } else {
        // const tweetU = await Tweet.update(
        //     { message: req.body.message },
        //     { where: { id: tweetId}}
        // )
        await tweet.destroy()
        res.status(204).end()
    }
}));




module.exports = router
