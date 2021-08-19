const express = require("express")
const router = express.Router()
const db = require("../db/models")
const {Tweet} = db
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const { check, validationResult } = require('express-validator')
const { requireAuth } = require("../auth");


router.use(requireAuth);

// const handleValidationErrors = (req, res, next) => {
//     const validationErrors = validationResult(req);
//     // TODO: Generate error object and invoke next middleware function
//     const tweetValidator = [
//      check('message')
//         .exists({checkFalsy: true})
//         .withMessage('tweet should exist')
//         .isLength({ max:280})
//         .withMessage('tweet should not be over 280 characters')
//     ]

//   };


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
