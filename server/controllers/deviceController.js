const { Device, DeviceInfo } = require("../models/models")
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require("path")
const { Json } = require("sequelize/lib/utils")
const { where } = require("sequelize")

class deviceController{
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg" || ".png"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info){
                info = Json.parse(info)
                info.forEach(i => 
                    DeviceInfo.create({
                        title: i.title,
                        decsription: i.decsription,
                        deviceId: device.id
                    })
                );
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let device;
        if(!brandId && !typeId){
            device = await Device.findAll({limit, offset})

        }
        else if(brandId && !typeId){
            device = await Device.findAll({where:{brandId}, limit, offset})

        }
        else if(!brandId && typeId){
            device = await Device.findAll({where:{typeId}, limit, offset})

        }
        else if(brandId && typeId){
            device = await Device.findAll({where:{typeId, brandId}, limit, offset})

        }
        return res.json(device)

    }
    async getOne(req,res){
        const{id} =req.params
        const device = await Device.findOne(
            {
                where:{id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return res.json(device)
    }
}

module.exports = new deviceController()