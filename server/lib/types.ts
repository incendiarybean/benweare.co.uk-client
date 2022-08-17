export interface WeatherFeatures {
    type: string;
    geometry: { type: string; coordinates: number[] };
    properties: {
        location: { name: string };
        requestPointDistance: number;
        modelRunDate: string;
        timeSeries: WeatherTimeSeries[];
    };
}

export interface WeatherTimeSeries {
    [key: string]: number | string;
}

export interface WeatherParam {
    [key: string]: {
        type: string;
        description: string;
        unit: {
            label: string;
            symbol: {
                value: string;
                type: string;
            };
        };
    };
}

export interface WeatherResponse {
    location: string;
    days: WeatherTimeSeries[];
    day: WeatherTimeSeries;
    type?: string;
    features?: WeatherFeatures[];
    parameters?: WeatherParam[];
}

export interface WeatherAxiosResponse {
    status: string;
    httpMessage: string;
    data: WeatherResponse;
}

export interface WeatherStorage {
    timestamp: string | undefined;
    data: WeatherResponse | undefined;
}

export interface WeatherConfig {
    method: string;
    url: string;
    qs: {
        [key: string]: string;
    };
    headers: {
        [key: string]: string;
    };
}

export interface NewsArticle {
    [key: string]: string;
}

export interface NasaArticle {
    [key: string]: string;
}

export interface NewsStorage {
    timestamp: string | undefined;
    data: {
        bbc: NewsArticle[] | undefined;
        pc: NewsArticle[] | undefined;
        nasa: NasaArticle | undefined;
    };
}
