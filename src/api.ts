import {NEWS_API_KEY, NEWS_BASE_URL} from "./envReader.js"
import {NewsResponse, NewsSourcesResponse} from './types/interfaces.js';

export const getNews = async (countryCode: string, language: string): Promise<NewsResponse | null> => {
    try {
        const res = await fetch(`${NEWS_BASE_URL}/api/1/latest?country=${countryCode}&language=${language}&apiKey=${NEWS_API_KEY}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching news:', error);
        return null;
    }
}

export const getNewsSources = async (countryCode: string, language: string): Promise<NewsSourcesResponse | null> => {
    try {
        const res = await fetch(`${NEWS_BASE_URL}/api/1/sources?country=${countryCode}&language=${language}&apiKey=${NEWS_API_KEY}`);
        if (!res.ok) {
            throw new Error(`HTTP error while fetching sources! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching news sources:', error);
        return null;
    }
}

export const getCryptoNews= async (coin: string, language: string, tags: string): Promise<NewsResponse | null> => {
    try {
        const res = await fetch(`${NEWS_BASE_URL}/api/1/crypto?coin=${coin}&language=${language}&apiKey=${NEWS_API_KEY}`);
        if (!res.ok) {
            throw new Error(`HTTP error while fetching crypto news! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching crypto news:', error);
        return null;
    }
}