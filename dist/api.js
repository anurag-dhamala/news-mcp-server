import { NEWS_API_KEY, NEWS_BASE_URL } from "./envReader.js";
export const getNews = async (countryCode, language) => {
    try {
        const res = await fetch(`${NEWS_BASE_URL}/api/1/latest?country=${countryCode}&language=${language}&apiKey=${NEWS_API_KEY}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const topNews = await res.json();
        return topNews;
    }
    catch (error) {
        console.error('Error fetching news:', error);
        return null;
    }
};
export const getNewsSources = async (countryCode, language) => {
    try {
        const res = await fetch(`${NEWS_BASE_URL}/api/1/sources?country=${countryCode}&language=${language}&apiKey=${NEWS_API_KEY}`);
        if (!res.ok) {
            throw new Error(`HTTP error while fetching sources! status: ${res.status}`);
        }
        const newsSources = await res.json();
        return newsSources;
    }
    catch (error) {
        console.error('Error fetching news sources:', error);
        return null;
    }
};
