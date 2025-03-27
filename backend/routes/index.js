const express = require('express');
const userRouter = require("../routes/user");
const accountRouter = require("../routes/account");

// creation of a router
const router = express.Router();

// actual route
router.use("/user", userRouter);
router.use("/account", accountRouter);

// exporting the router
module.exports = router;
