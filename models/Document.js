const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DocumentSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        links: {
            type: String,
        },
        documentSrc:{
            type: String,
            default:''
        },
        chapter: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('document', DocumentSchema)