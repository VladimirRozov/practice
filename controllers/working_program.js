const WorkingProgram = require('../models/WorkingProgram')
const Theory = require('../models/Theory')
const Practice = require('../models/Practice')
const errorHandler = require('../utils/errorHandler')

module.exports.getById = async function (req,res){

    try {
        const workingProgram = await  WorkingProgram.find({_id: req.params.id})
        res.status(200).json(workingProgram)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.getByEducationId = async function (req,res){
    const query = {educationalProgram: req.params.educationalProgram._id,
        user: req.user.id}

    try {
        const workingProgram = await WorkingProgram.find(query)
            .sort({semester: +1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)


        res.status(200).json(workingProgram)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req,res){
    try {
        await WorkingProgram.remove({_id: req.params.id})
        await Theory.remove({workingProgram: req.params.id})
        await Practice.remove({workingProgram: req.params.id})
        res.status(200).json({message: 'Рабочая программа дисциплины успешно удалена'})
    } catch (e){
        errorHandler(res, e)
    }
}

// дописать поля
module.exports.create = async function (req,res){
    try {
        const workingProgram = await new WorkingProgram({
            name: req.body.name,
            semester: req.body.semester,
            educationalProgram: req.body.educationalProgram,
            user: req.user.id
        }).save()
        res.status(201).json(workingProgram)
    } catch (e){
        errorHandler(res, e)
    }
}

module.exports.patch = async function (req,res){
    try {
        const workingProgram = await WorkingProgram.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(workingProgram)
    } catch (e){
        errorHandler(res, e)
    }
}