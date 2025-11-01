const jwt = require("jsonwebtoken")

module.exports = function(req, res, next){
    if(req.method === "OPTIONS"){
        next()
    }
    try{
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({message: "Пользователь не авторизован"})
        }

        const TOKEN = authHeader.split(' ')[1]//bearer
        if(!TOKEN){
            return res.status(401).json({message: "Не корректный формат токена"})
        }
        
        const decoded = jwt.verify(TOKEN, process.env.SECRET_KEY)
        req.user = decoded
        next()
    }catch(err){
        console.log("Ошибка авторизации", err.name)
        res.status(401).json({message: "Пользователь не авторизован"})
    }
}