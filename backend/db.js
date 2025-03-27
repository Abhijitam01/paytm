const mongoose = require('mongoose');

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

const User = new mongoose.model("User" , userSchema)

module.exports = {
    User
}