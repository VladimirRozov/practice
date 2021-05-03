const {compareSync, genSaltSync, hash} = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require ('../utils/errorHandler')

module.exports.login = async function (req,res){
    const candidate = await User.findOne({login: req.body.login})

    if (candidate) {
        const passwordResult = compareSync(req.body.password, candidate.password)
        if (passwordResult){
            const token = jwt.sign({
                role: candidate.role,
                userId: candidate._id
            }, keys.jsonWebToken,{expiresIn: 3600})

            res.status(200).json({
                message:'Вход произешел успешно',
                token: 'Bearer ' + token
            })
        }else{
          res.status(401).json({
              message: 'Пароли не совпадают'
          })
        }
    } else {
        res.status(404).json({
            message: 'Пользователь с таким login не найден в системе'
        })
    }
}

module.exports.register = async function (req,res) {

    const candidate = await User.findOne({login: req.body.login})

    if (candidate) {
        res.status(409).json({
            message: 'Такой login уже существует'
        })
    } else {

        const salt = genSaltSync(10)
        const hashPassword =  await hash(req.body.password, salt)

        let user;
        user = new User({
            login: req.body.login,
            password: hashPassword,
            first_name: req.body.first_name,
            second_name: req.body.second_name,
            role: req.body.role,
            description: req.body.description
        });

        try{
            await user.save()
            res.status(201).json({
                message:'Пользователь создан'
            })
        } catch (e){
            errorHandler(res, e)
        }
    }
}

