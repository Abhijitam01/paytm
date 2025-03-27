const mongoose = require('mongoose');
const { number } = require('zod');

mongoose.connect('')

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        trim: true,
        minLength : 6,
        maxLength : 30,
        unique : true,
        lowercase : true
    } ,
    password : {
        type : String ,
        required : true,
        minLenght : 6,
        maxLength : 30
    } ,
    firstName : {
        type : String ,
        required : true,
        minLenght : 3,
        maxLength : 30
    },
    lastName : {
        type : String ,
        required : true,
        minLenght : 3,
        maxLength : 30
    }

})

const accountSchema = new mongoose.Schema ({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const User = new mongoose.model("User" , userSchema)
const Account = new mongoose.model("Account" , accountSchema)

module.exports = {
    User,
    Account
}