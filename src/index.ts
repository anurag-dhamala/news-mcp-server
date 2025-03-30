import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from "zod";
import { getNews, getNewsSources } from './api.js';



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
    const alerts = await getNewsSources(location, language);
    if(!alerts) {
        return {
            content: [
                {type: 'text',
                text: 'Failed to retrieve news sources'}
            ]
        }
    }
    if(alerts.results.length <=0) {
        return {
            content:[
                {type: "text",
                text: "No news sources available"}
            ]
        }
    }
    let formatterNewsText="";
    alerts.results.map(source=> {
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

async function startServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

startServer().catch(console.error);