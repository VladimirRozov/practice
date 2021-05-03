const mongoose = require('mongoose')
const Schema = mongoose.Schema
//практическая состовляющая дисциплины
const practiceSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    workingProgram:{
        ref: 'workingProgram',
        type: Schema.Types.ObjectId
    },
    documentSrc:{
        type: String,
        default:''
    },
    laborTasks:[
        {
            labs: String,
            description: String
        }
    ],
    newLaborTasks:[
        {
            labs: String,
            description: String
        }
    ],
    user:{
        ref: 'user',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('practice', practiceSchema)