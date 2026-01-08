const jwt = require("jsonwebtoken")

module.exports = function(role){
    return function(req, res, next){
        if(req.method === "OPTIONS"){
            next()
        }
        try{
            const TOKEN = req.headers.authorization.split(' ')[1]//bearer
            if(!TOKEN){
                return res.status(401).json({message: "Non token"})
            }

            const decoded = jwt.verify(TOKEN, process.env.SECRET_KEY)
            if(decoded.role !== role){
                return res.status(403).json({message: "Non access"})
            }
            req.user = decoded

            next()
        }catch(err){
            res.status(401).json({message: "Пользователь не авторизован"})
        }
    }
}