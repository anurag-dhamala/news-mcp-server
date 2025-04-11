import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from "zod";
import {getCryptoNews, getNews, getNewsSources} from './api.js';



const server = new McpServer({
    name: 'news-mcp-server',
    version: '1.0.0',
    capabilities: {
        resources: {},
        tools:{}
    }
});


server.tool(
    "get-latest-news", 
    "Get latest news alerts based on country code (e.g. us, in, au), or language (e.g. fr,ne,en)", 
    {
        countryCode: z.string().length(2).describe("Two letter country code (e.g. np, us, au)").optional().default(""),
        language: z.string().length(2).describe("Two letter language code (e.g. ne, en, fr)").optional().default("en"),
    }, 
    async ({countryCode, language}) => {
    const location = countryCode?.toLowerCase() ?? "";
    const alerts = await getNews(location, language);
    if(!alerts) {
        return {
            content: [
                {type: 'text',
                text: 'Failed to retrieve latest news'}
            ]
        }
    }
    if(alerts.results.length <=0) {
        return {
            content:[
                {type: "text",
                text: "No latest news alerts available"}
            ]
        }
    }
    let formatterNewsText="";
    alerts.results.map(article=> {
        formatterNewsText = formatterNewsText+`\n
        News: ${article.title}\n
        Summary: ${article.description}\n
        Source: ${article.source_name}
        `
    })
    return {
        content: [
            {
                type: "text",
                text: formatterNewsText
            }
        ]
    }
});

server.tool(
    "get-news-sources",
    "Get news sources based on country code (e.g. us, in, au), or language (e.g. fr,ne,en)",
    {
        countryCode: z.string().length(2).describe("Two letter country code (e.g. np, us, au)").optional().default(""),
        language: z.string().length(2).describe("Two letter language code (e.g. ne, en, fr)").optional().default("en"),
    }, 
    async ({countryCode, language}) => {
       const location = countryCode?.toLowerCase() ?? "";
    const sources = await getNewsSources(location, language);
    if(!sources) {
        return {
            content: [
                {type: 'text',
                text: 'Failed to retrieve news sources'}
            ]
        }
    }
    if(sources.results.length <=0) {
        return {
            content:[
                {type: "text",
                text: "No news sources available"}
            ]
        }
    }
    let formatterNewsText="";
    sources.results.map(source=> {
        formatterNewsText = formatterNewsText+`\n
        News: ${source.name}\n
        Summary: ${source.description}\n
        Url: ${source.url}
        `
    })
    return {
        content: [
            {
                type: "text",
                text: formatterNewsText
            }
        ]
    } 
});

server.tool(
    "get-latest-crypto-news",
    "Fetch the latest cryptocurrency news. Optionally, filter by specific coin (e.g. btc, eth,usdt,bnb), language (e.g. ne, en, fr) or tag (e.g. blockchain, liquidity, scam) for more tailored updates.",
    {
        coin: z.string().describe("Search the news articles for specific crypto coins using their short forms only. You can add up to 5 coins in a single query. (e.g coin=btc, coin=eth,usdt,bnb").optional().default(""),
        language: z.string().length(2).describe("Two letter language code (e.g. ne, en, fr)").optional().default("en"),
        tags: z.string().describe("Search the news articles for specific Crypto AI-classified tags. You can add up to 5 tags in a single query. (e.g. tag=blockchain, tag=liquidity,scam)").optional().default(""),
    },
    async ({coin, language, tags}) => {
        const cryptoNews = await getCryptoNews(coin, language, tags);
        if(!cryptoNews) {
            return {
                content: [
                    {type: 'text',
                        text: 'Failed to retrieve crypto news'}
                ]
            }
        }
        if(cryptoNews.results.length <=0) {
            return {
                content:[
                    {type: "text",
                        text: "No crypto news available"}
                ]
            }
        }
        let formatterNewsText="";
        cryptoNews.results.map(article=> {
            formatterNewsText = formatterNewsText+`\n
        News: ${article.title}\n
        Summary: ${article.description}\n
        `
        })
        return {
            content: [
                {
                    type: "text",
                    text: formatterNewsText
                }
            ]
        }
    });

async function startServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

startServer().catch(console.error);