export interface NewsSource {
    id: string | null;
    name: string;
}

export interface NewsArticle {
    article_id: string;
    title: string;
    link: string;
    keywords: string[];
    creator: string[] | null;
    video_url: string | null;
    description: string;
    content: string | null;
    pubDate: string;
    pubDateTZ: string;
    image_url: string;
    source_id: string;
    source_priority: number;
    source_name: string;
    source_url: string;
    source_icon: string;
    language: string;
    country: string[];
    category: string[];
    ai_tag: string;
    sentiment: string;
    sentiment_stats: string;
    ai_region: string;
    ai_org: string;
    duplicate: boolean;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    results: NewsArticle[];
    nextPage: string;
}

export interface NewsSourceInfo {
    id: string;
    name: string;
    url: string;
    icon: string;
    priority: number;
    description: string;
    category: string[];
    language: string[];
    country: string[];
    total_article: number;
    last_fetch: string;
}

export interface NewsSourcesResponse {
    status: string;
    totalResults: number;
    results: NewsSourceInfo[];
    nextPage: string | null;
} 