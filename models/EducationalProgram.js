const mongoose = require('mongoose')
const Schema = mongoose.Schema
//образовательная программа
const educationalProgramSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    specialization:{
        type: String,
        required: true
    },
    qualification:{
        type: String,
        required: true
    },
    number_code:{
        type: String,
        required: true
    },
    comments:[{
        ref: 'comment',
        type: Schema.Types.ObjectId
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

module.exports = mongoose.model('educational_program', educationalProgramSchema)