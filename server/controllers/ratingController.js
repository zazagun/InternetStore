const { Rating, Device} = require("../models/models");

class RatingController {
    // Добавление рейтинга устройству
    async addRating(req, res) {
        try {
            const { rate } = req.body
            const userId = req.user.id;
            const deviceId = req.params.id

            if (rate < 0 || rate > 5) {
                return res.status(400).json({ message: "Рейтинг должен быть от 0 до 5" });
            }
            if (!deviceId || !userId) {
                return res.status(400).json({ message: "Некорректные данные" });
            }

            const existingRating = await Rating.findOne({
                where: {
                    userId: userId,
                    deviceId: deviceId
                }
            });

            if (existingRating) {
                return res.status(400).json({ message: "Вы уже оценивали это устройство" });
            }

            const rating = await Rating.create({
                rate: rate,
                userId: userId,
                deviceId: deviceId
            });

            // Обновление среднего рейтинга устройства
            const ratings = await Rating.findAll({
                where: { deviceId: deviceId }
            });

            const totalRate = ratings.reduce((sum, rating) => sum + rating.rate, 0);
            const averageRate = totalRate / ratings.length;

            await Device.update(
                { rating: averageRate },
                { where: { id: deviceId } }
            );

            return res.json(rating);
        } catch (error) {
            console.error("Ошибка при добавлении рейтинга:", error);
            return res.status(500).json({ message: "Произошла ошибка при добавлении рейтинга" });
        }
    }

    async getTotalRates(req, res) {
    try {
        const idDevice = req.params.id

        if (!idDevice) {
            return res.status(400).json({ message: "ID устройства не указан" })
        }

        const totalRates = await Rating.findAll({
            where: {
                deviceId: idDevice
            }
        });

        // Проверка, что totalRates не пустой массив
        if (!totalRates || totalRates.length === 0) {
            return res.status(404).json({ message: "Оценки не найдены" })
        }

        return res.json(totalRates)
    } catch (error) {
        console.error("Ошибка при получении рейтинга:", error)
        return res.status(500).json({ message: "Произошла ошибка при получении рейтинга" })
    }
}
}

module.exports = new RatingController();