const express = require('express')
const userRouter = require("./user")
// creation of a router
const router = express.Router();

// actual route

router.use("/user" , userRouter)


// exporting the router
module.exports = {
    router
}