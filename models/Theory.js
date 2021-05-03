const mongoose = require('mongoose')
const Schema = mongoose.Schema
//теоретическая состовляющая дисциплины
const theorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    workingProgram:{
        ref: 'workingProgram',
        type: Schema.Types.ObjectId
    },
    program:[{
        section: String,
        description: String
    }],
    documentSrc:{
        type: String,
        default:''
    },
    user:{
        ref: 'user',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('theory', theorySchema)