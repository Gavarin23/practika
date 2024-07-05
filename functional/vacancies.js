const headhunterService = require('../api/hh');
const vacancySchema = require('../basa/schemas/vacanci');

class VacanciesController {
    async getVacancies(req, res) {
        try {
            const { name, page, salary, currency, area, employment, experience, schedule } = req.query;

            if (!name) {
                return res.status(400).json({ error: 'Name is required' });
            }

            const data = await headhunterService.getVacancies(name, 50, page, salary, currency, area, employment, experience, schedule);

            const operations = data.vacancies.map(vacancy => ({
                updateOne: {
                    filter: { id: vacancy.id },
                    update: { $set: vacancy },
                    upsert: true,
                },
            }));

            await vacancySchema.bulkWrite(operations);

            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAllVacancies(req, res) {
        try {
            const page = parseInt(req.query.page) || 0;
            const limit = 50;
            const skip = page * limit;

            const totalVacancies = await vacancySchema.countDocuments();
            const totalPages = Math.ceil(totalVacancies / limit) - 1;

            const vacancies = await vacancySchema.find({}).skip(skip).limit(limit);

            res.json({
                info: {
                    page,
                    totalPages,
                    totalVacancies,
                },
                vacancies,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new VacanciesController();
