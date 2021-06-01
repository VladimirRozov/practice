const Comment = require('../models/Comment')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req,res){
    try {
        const comments = await  Comment.find()
        res.status(200).json(comments)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req,res){
    try {
        await Comment.remove({_id: req.params.id})
        res.status(200).json({message: 'Комментарий успешно удалена'})
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.create = async function (req,res){
    const comments = new Comment({
        text: req.body.text,
        rating: req.body.rating,
        user: req.user.id
    })
    try {
        await comments.save()
        res.status(201).json(comments)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.patch = async function (req,res){
    const updated = {
        text: req.body.text
    }
    try {
        const comments = await Comment.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(comments)
    } catch (e){
        errorHandler(res, e)
    }
}