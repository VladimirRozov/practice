const mongoose = require('mongoose')
const Schema = mongoose.Schema
//описание дисциплины образовательной программы
const workingProgramSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    educationalProgram: {
        ref: 'educationalProgram',
        type: Schema.Types.ObjectId
    },
    competencies: [{
            code: String,
            resultEducation: String
        }],
    hours: [{
       section: String,
       lecture: Number,
       labs: Number,
       practice: Number,
       studWork: Number
    }],
    need_subject:[{
        name: String,
        semester: Number
    }],
    for_subject:[{
        name: String,
        semester: Number
    }],
    comments:[{
            ref: 'comment',
            type: Schema.Types.ObjectId
    }],
    user:{
        ref: 'user',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('working_program', workingProgramSchema)