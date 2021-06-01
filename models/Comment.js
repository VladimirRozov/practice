const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    text: String,
    rating: Number,
    user:{
        ref: 'user',
        type: Schema.Types.ObjectId
    }

})

module.exports = mongoose.model('comment', commentSchema)
