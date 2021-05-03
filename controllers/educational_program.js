const EducationalProgram = require('../models/EducationalProgram')
const WorkingProgram = require('../models/WorkingProgram')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req,res){
    try {
       const educationalPrograms = await  EducationalProgram.find()
        res.status(200).json(educationalPrograms)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req,res){
    try {
        const educationalProgram = await  EducationalProgram.findById(req.params.id)
        res.status(200).json(educationalProgram)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req,res){
    try {
        await EducationalProgram.remove({_id: req.params.id})
        await WorkingProgram.remove({educationalProgram: req.params.id})
        res.status(200).json({message: 'Образовательня программа удалена'})
    } catch (e){
        errorHandler(res, e)
    }
}
    // дописать поля
module.exports.create = async function (req,res){
    try {
        const educationalProgram = await new EducationalProgram({
            name: req.body.name,
            qualification: req.body.qualification,
            number_code: req.body.number_code,
            user: req.user.id
        }).save()
        res.status(201).json(educationalProgram)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.patch = async function (req,res){
    try {
        const educationalProgram = await EducationalProgram.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(educationalProgram)
    } catch (e){
        errorHandler(res, e)
    }
}