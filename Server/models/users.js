const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const userSchema = new Schema({
    username: {type:String,required: true},
    password: {type: String,required: true},
    avatar: {type: String},
    date: {type: Date, default: Date.now}
})

module.exports = User = model('user',userSchema)