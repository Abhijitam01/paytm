const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db');
const { JWT_SECRET } = require('../config');
const authMiddleware = require('../middleware');

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    lastName: zod.string(),
    firstName: zod.string()
});

router.post("/signup", async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            });
        }

        const existingUser = await User.findOne({
            username: req.body.username
        });

        if (existingUser) {
            return res.status(411).json({
                message: "User already exists"
            });
        }

        const user = await User.create({
            username: req.body.username,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            password: req.body.password
        });

        const userId = user._id;
        await Account.create({
            userId,
            balance: 1 + Math.random() * 100000
        });

        res.status(200).json({
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    try {
        const { success } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Error while logging in"
            });
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET);

            return res.json({
                message: "Logged in successfully",
                token: token
            });
        }

        res.status(403).json({
            message: "Error while logging in"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error during login",
            error: error.message
        });
    }
});

const updateBody = zod.object({
    password: zod.string().optional(),
    lastName: zod.string().optional(),
    firstName: zod.string().optional()
});

router.put("/", authMiddleware, async (req, res) => {
    try {
        const { success } = updateBody.safeParse(req.body);
        if (!success) {
            return res.status(403).json({
                message: "Error while updating"
            });
        }

        await User.updateOne({
            _id: req.userId
        }, { $set: req.body });

        res.json({
            message: "Updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error during update",
            error: error.message
        });
    }
});

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id
        }))
    });
});

module.exports = router;