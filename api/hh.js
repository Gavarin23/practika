const fetch = require('node-fetch');
const querystring = require('querystring');

async function getVacancies(text, perPage = 50, page = 0, salary = null, currency = null, area = null, employment = null, experience = null, schedule = null) {
    const params = new URLSearchParams({
        text,
        per_page: perPage.toString(),
        page: page.toString(),
        ...(!salary && !currency && !area && !employment && !experience && !schedule ? {} : {
            salary,
            currency,
            area,
            employment,
            experience,
            schedule
        })
    }).toString();

    const url = `https://api.hh.ru/vacancies?${params}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Добавляем поле created_at с текущей датой и временем
        data.items.forEach(item => {
            item.created_at = new Date().toISOString(); // Используем ISO строку для стандартизации формата даты
        });

        const info = {
            page: data.page,
            totalPages: data.pages - 1,
            totalVacancies: data.found,
        };

        return { info: info, vacancies: data.items };
    } catch (error) {
        console.error('Error fetching vacancies:', error);
        throw error;
    }
}

module.exports = {
    getVacancies,
};
