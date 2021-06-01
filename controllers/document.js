const Document = require('../models/Document')
const errorHandler = require('../utils/errorHandler')

module.exports.getByChapter = async function (req,res){
    try {
        const document = await Document.find({
            chapter: req.params.chapter,
        })
        res.status(200).json(document)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req,res){
    try {
        const document = await Document.find({
            chapter: req.params.id,
        })
        res.status(200).json(document)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req,res){
    try {
        await Document.remove({_id: req.params.id})
        res.status(200).json({message: 'Документ успешно удалена'})
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.create = async function (req,res){

    const document = new Document({
        name: req.body.name,
        links: req.body.links,
        documentSrc: req.file ? req.file.path : '',
        chapter: req.body.chapter
    })
    try {
        await document.save()
        res.status(201).json(document)
    } catch (e){
        errorHandler(res, e)
    }
}