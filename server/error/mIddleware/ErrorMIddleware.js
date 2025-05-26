const { model } = require('../../db')
const ApiError = require('../apiError')

module.exports = function (err, req, res, next){
    if (err instanceof ApiError){
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Не обрабоботанная ошибка"})
}

