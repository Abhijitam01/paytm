const express = require('express')
const router = express.Router()
const zod = require('zod')
const {  User } = require('../db')
const { JWT_SECRET } = require('../config')
const { authMiddleware } = require('../middleware')
const mongoose = require('mongoose')

const signupBody = zod.object({
    username :zod.string().email(),
    password :zod.string(),
    lastName :zod.string() ,
    firstName:zod.string() 
})
// /api/v1/user/signup
router.post("/signup" , async (req , res) =>{
    const { success } = signupBody.safeParse(req.body);

    if(!success){
        res.status(403).json({
            message : " Error whole creating the user"
        })
    }

    const existingUser = await User.findone({
        username : req.body.username
    })

    if(existingUser){
        res.json({
            message : " User already exist , try logging in"
        })
    }

    const user = await User.create({
        username : req.body.username ,
        lastName : req.body.lastName,
        firstName : req.body.firstName,
        password : req.body.password  
    })
    await Account.create({
        userId,
        balance :1 + Math.random() * 100000
    })

    res.json({
        message : "user created successfully"
    })
})

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.password()
})

router.post("/signin", async (req,res) => {
    const { success} = signinBody.safeParse(req.body)
    if ( !success){
        res.status(411).json({
            message : "Error while logging in"
        })
    }

    const user = await User.findone({
        username : req.body.username ,
        password : req.body.username
    });

    if(user){
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET)
        res.json({
            message : "Logged in successfully",
            token:token
        })
    }

    res.status(403).json({
        message : "Error whole logging in"
    })
})

const updateBody = zod.object({
    password : zod.string().optional(),
    lastName : zod.string().optional(),
    firstName : zod.string().optional()
})

router.put("/" , authMiddleware, async(req , res) => {
    const { success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(403).json({
            message : "Error while updating"
        })
    }

    await User.updateOne({
        id:req.userId
    }, {$set : req.body})

    res.json({
        message : "Updated successfully"
    })
})

router.get("/bulk" , async (res, res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex" : filter
            }
        },{
            lastName : {
                "$regex" : filter
            }
        }]
    })

    res.json({
        user:users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })
})

module.exports = router;