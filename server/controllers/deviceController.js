const { Device, DeviceInfo } = require("../models/models")
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require("path")
const noImagePath = path.resolve(__dirname, '../assets/imageMissing.svg')

class deviceController{
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files || {}

            let fileName;
            if (img) {
                fileName = uuid.v4() + path.extname(img.name)
                await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            } else {
                fileName = path.basename(noImagePath)
            }

            const device = await Device.create({
                name,
                price,
                brandId,
                typeId,
                img: fileName
            })

            if (info) {
                info = JSON.parse(info)
                await Promise.all(info.map(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                ))
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 8 //change
        let offset = page * limit - limit
        let device;
        if(!brandId && !typeId){
            device = await Device.findAndCountAll({limit, offset})

        }
        else if(brandId && !typeId){
            device = await Device.findAndCountAll({where:{brandId}, limit, offset})

        }
        else if(!brandId && typeId){
            device = await Device.findAndCountAll({where:{typeId}, limit, offset})

        }
        else if(brandId && typeId){
            device = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})

        }
        return res.json(device)
    }

    async getOne(req,res){
        const{id} = req.params
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