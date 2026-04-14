const { Rating, Device} = require("../models/models");

class RatingController {
    constructor() {
        this.ratingCache = new Map();
        this.addRating = this.addRating.bind(this);
        this.getTotalRates = this.getTotalRates.bind(this);
    }

    async calculateAverageRating(deviceId) {
        const ratings = await Rating.findAll({
            where: { deviceId: deviceId }
        })

        if (ratings.length === 0) return 0

        const totalRate = ratings.reduce((sum, rating) => sum + rating.rate, 0)
        return totalRate / ratings.length
    }

    async calculateAppreciated(deviceId){
        const ratings = await Rating.findAll({
            where: {deviceId: deviceId }
        })

        if (ratings.length === 0) return 0

        return ratings.length
    }

    invalidateRatingCache(deviceId) {
        this.ratingCache.delete(deviceId)
    }

    // Добавление рейтинга устройству
    async addRating(req, res) {
        try {
            const { rate } = req.body
            const userId = req.user.id;
            const deviceId = req.params.id

            if (rate < 0 || rate > 5) {
                return res.status(400).json({ message: "Рейтинг должен быть от 0 до 5" })
            }
            if (!deviceId || !userId) {
                return res.status(400).json({ message: "Некорректные данные" })
            }

            const existingRating = await Rating.findOne({
                where: {
                    userId: userId,
                    deviceId: deviceId
                }
            })

            if (existingRating) {
                return res.status(400).json({ message: "Вы уже оценивали это устройство" })
            }

            const rating = await Rating.create({
                rate: rate,
                userId: userId,
                deviceId: deviceId
            })

            // Обновление среднего рейтинга устройства
            const averageRate = await this.calculateAverageRating(deviceId)

            await Device.update(
                { rating: averageRate },
                { where: { id: deviceId } }
            )

            this.invalidateRatingCache(deviceId)

            return res.json(rating)
        } catch (error) {
            console.error("Ошибка при добавлении рейтинга:", error)
            return res.status(500).json({ message: "Произошла ошибка при добавлении рейтинга" })
        }
    }

    async getTotalRates(req, res) {
        try {
            const idDevice = req.params.id

            if (!idDevice) {
                return res.status(400).json({ message: "ID устройства не указан" })
            }

            const Appreciated = await this.calculateAppreciated(idDevice)

            // проверка кэша
            if (this.ratingCache.has(idDevice)) {
                return res.json({
                    averageRating: this.ratingCache.get(idDevice),
                    appreciated: Appreciated,
                    fromCache: true
                })
            }

            const averageRating = await this.calculateAverageRating(idDevice)
            this.ratingCache.set(idDevice, averageRating)

            return res.json({
                averageRating: averageRating,
                appreciated: Appreciated,
                fromCache: false,
            })
        } catch (error) {
            console.error("Ошибка при получении рейтинга:", error)
            return res.status(500).json({ message: "Произошла ошибка при получении рейтинга" })
        }
    }
}

module.exports = new RatingController()