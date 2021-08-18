const express = require("express")
const router = express.Router()
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get("/", async (req, res) => {
    res.json("Test root index");
  });
module.exports = router
