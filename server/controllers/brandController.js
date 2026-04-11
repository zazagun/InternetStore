const {Brand} = require('../models/models')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        if(name.length < 1 || name.length > 20) {
            return res.status(400).json({message: "Invalid brand name. name lenght must be between 1 and 20 characters."})
        }else{
            const brand = await Brand.create({name})
            return res.json(brand)
        }
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

}

module.exports = new BrandController()