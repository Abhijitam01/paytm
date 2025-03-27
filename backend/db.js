const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhijitam:yY9PI6KA3S2eXLGL@cluster0.wszla.mongodb.net/paytm');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 30,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,  // Corrected typo from 'minLenght'
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        minLength: 3,  // Corrected typo from 'minLenght'
        maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,  // Corrected typo from 'minLenght'
        maxLength: 30
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
};