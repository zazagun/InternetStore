const { Basket, BasketDevice, Device } = require("../models/models");

class basketController {
    async addDevice(req, res) {
        const { deviceId } = req.body
        const userId = req.user.id//fix

        let basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            basket = await Basket.create({ userId });
        }

        const existingBasketDevice = await BasketDevice.findOne({
            where: { basketId: basket.id, deviceId }
        });

        if (existingBasketDevice) {
            return res.status(400).json({message: "device in the basket"});
        }

        const basketDevice = await BasketDevice.create({ basketId: basket.id, deviceId });
        return res.json(basketDevice);
    }

    async getAll(req, res) {
        const userId = req.user.id

        const basket = await Basket.findOne({ where: { userId } })
        if (!basket) {
            return res.status(404).json({message: "basket undefind"})
        }

        const basketDevices = await BasketDevice.findAll({
            where: { basketId: basket.id },
            include: [{ model: Device }]
        })

        return res.json(basketDevices);
    }

    async deleteFromBasket(req, res) {
        const { deviceId } = req.body
        const userId = req.user.id

        const basket = await Basket.findOne({ where: { userId } })
        if (!basket) {
            return res.status(404).json({ message: "basket undefind" })
        }

        const deletedRows = await BasketDevice.destroy({
            where: { basketId: basket.id, deviceId }
        })

        if (deletedRows === 0) {
            return res.status(404).json({ message: "device undefind" })
        }

        return res.json({ message: "device delete from basket" })
    }
}

module.exports = new basketController();
