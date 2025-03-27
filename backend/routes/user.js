const express = require('express')
const router = express.Router()
const zod = require('zod')
const {  User } = require('../db')

const signupBody = zod.object({
    username :zod.string().email(),
    password :zod.string().password(),
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

    res.json({
        message : "user created successfully"
    })
})


module.exports = router;