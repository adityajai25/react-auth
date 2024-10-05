const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    fname: String,
    lname: String,
    email: {
        type: String,
        unique : true
    },
    password: String,
    city: String
})

module.exports = mongoose.model('User',userSchema);