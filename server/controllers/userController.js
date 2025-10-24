const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require("../models/models")
const { json } = require('sequelize')

const generaetJwt  = (id, email, role) =>{
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}

class UserController{
    async registration(req, res, next){
        const {email, password, role} = req.body

        if(!email || !password){
            return next (ApiError.badRequest('Не корректны email или password'))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest("email уже зарегестрирван"))
        }

        const hashPassword = await bcrypt.hash(password, 5) // (5) кол-во итераций шифрования
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})

        const TOKEN = generaetJwt(user.id, user.email, user.role)

        return res.json({TOKEN})
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next (ApiError.internal("Не верные данные"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next (ApiError.internal("Не верный пароль"))
        }
        const TOKEN = generaetJwt(user.id, user.email, user.role)
        return res.json({TOKEN})
    }
    
    async check(req, res, next){
        return res.json({message: "all fine"})//переписать
    }
}

module.exports = new UserController()