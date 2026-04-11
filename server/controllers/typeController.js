const {Type} = require('../models/models')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        if(name.length < 1 || name.length > 20) {
            return res.status(400).json({message: "Invalid type name. name lenght must be between 1 and 20 characters."})
        }else{
            const type = await Type.create({name})
            return res.json(type)
        }     
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

}

module.exports = new TypeController()