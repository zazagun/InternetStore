const { Rating, Device, User } = require("../models/models");

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

    // Получение всех оценок устройства
    async getAllRating(req, res) {
        try {
            const deviceId = req.params.id;
            const ratings = await Rating.findAll({
                where: { deviceId: deviceId },
                include: [{ model: User, attributes: ['id', 'email'] }]
            });
            return res.json(ratings);
        } catch (error) {
            console.error("Ошибка при получении рейтингов:", error);
            return res.status(500).json({ message: "Произошла ошибка при получении рейтингов" });
        }
    }

    // Получение оценки пользователя для устройства
    async getRatingOne(req, res) {
        try {
            const userId = req.user.id;
            const deviceId = req.params.id;

            const rating = await Rating.findOne({
                where: {
                    userId: userId,
                    deviceId: deviceId
                }
            });

            if (!rating) {
                return res.status(404).json({ message: "Оценка не найдена" });
            }

            return res.json(rating);
        } catch (error) {
            console.error("Ошибка при получении рейтинга:", error);
            return res.status(500).json({ message: "Произошла ошибка при получении рейтинга" });
        }
    }
}

module.exports = new RatingController();