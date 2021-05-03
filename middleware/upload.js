const multer = require('multer')
const moment = require('moment')
    // для загрузки файлов
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null,`${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'application/pdf' || file.mimetype === 'application/msword'){
        cb(null, true)
    } else{
        cb(null, false)
    }
}

const limits = {
    fileSize: 8388608
}

module.exports = multer({
    storage,
    fileFilter,
    limits
})