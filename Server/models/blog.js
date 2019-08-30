const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const blogSchema = new Schema({
    title: {type:String,required: true},
    content: {type: String,required: true},
    author: {type: String, required: true},
    date: {type: Date, default: Date.now}
})

module.exports = User = model('blog',blogSchema)