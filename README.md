# MCP server for news-data

MCP server for getting up-to-date news with newsdata.io

## Setup

If you clone this repo, then you can use the config below:

```json
{
  "mcpServers": {
    "news": {
        "command": "path_to_your_node",
        "args": [
            "location_to_your_dist/index.js"
        ],
        "env": {
            "NEWS_API_KEY": "API_KEY_FROM_NEWS_DATA",
            "NEWS_BASE_URL": "https://newsdata.io"
        }
    }
  }
}

```

You can also use <b>npx</b>.

```json
{
  "mcpServers": {
    "news": {
        "command": "path_to_your_npx",
        "args": [
            "news-mcp-server"
        ],
        "env": {
            "NEWS_API_KEY": "API_KEY_FROM_NEWS_DATA",
            "NEWS_BASE_URL": "https://newsdata.io"
        }
    }
  }
}

```




## Example Prompts

Give me latest news from USA trending today.

Give me top news headlines from Nepal in Nepali language.

Give me news sources from Bhutan.

...
