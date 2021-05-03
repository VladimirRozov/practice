const Practice = require('../models/Practice')
const errorHandler = require('../utils/errorHandler')


module.exports.getByWorkingId = async function (req,res){
    try {
        const practice = await Practice.find({
            workingProgram: req.params.workingId,
            user: req.user.id
        })
        res.status(200).json(practice)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req,res){
    try {
        await Practice.remove({_id: req.params.id})
        res.status(200).json({message: 'Практическая часть рабочей программы дисциплины успешно удалена'})
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.create = async function (req,res){
    const practice = new Practice({
        name: req.body.name,
        workingProgram: req.body.workingProgram,
        documentSrc: req.file ? req.file.path : '',
        user: req.user.id
    })
    try {
        await practice.save()
        res.status(201).json(practice)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.patch = async function (req,res){
    const updated = {
        name: req.body.name
    }
    if (req.file){
        updated.documentSrc = req.file.path
    }
    try {
        const practice = await Practice.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(theory)
    } catch (e){
        errorHandler(res, e)
    }
}