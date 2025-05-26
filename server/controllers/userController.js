const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require("../models/models")

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

        const TOKEN = jwt.sign(
            {id:user.id, email:email,role},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )

        return res.json({TOKEN})

        //тут дальше писать
        //1.00.50 проерить в postman работу jwt

    }
    async login(req, res){

    }
    
    async check(req, res, next){
        const {id} = req.query
        if (!id){
            return next(ApiError.badRequest("Не задан ID"));
        }
        res.json(id);
    }
}

module.exports = new UserController()