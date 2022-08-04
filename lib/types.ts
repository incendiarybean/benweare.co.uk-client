export interface Icons {
    Home: React.FunctionComponent;
    Info: React.FunctionComponent;
    DownArrow: React.FunctionComponent;
    UpArrow: React.FunctionComponent;
    Burger: React.FunctionComponent;
    Packages: React.FunctionComponent;
    OpenBox: React.FunctionComponent;
    Box: React.FunctionComponent;
}

export interface Notification {
    custom: Function;
    error: Function;
    success: Function;
}

export interface NasaArticle {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

export interface News {
    GamingArticles: HTMLElement[];
    NasaArticles: NasaArticle;
    NewsArticles: HTMLElement[];
    Loaded: boolean;
}

export interface WeatherDay {
    midnight10MWindDirection: number;
    midnight10MWindGust: number;
    midnight10MWindSpeed: number;
    midnightMslp: number;
    midnightRelativeHumidity: number;
    midnightVisibility: number;
    nightLowerBoundMinFeelsLikeTemp: number;
    nightLowerBoundMinTemp: number;
    nightMinScreenTemperature: number;
    nightUpperBoundMinFeelsLikeTemp: number;
    nightUpperBoundMinTemp: number;
    time: string;
    Day: string;
    MaxTemp: string;
    LowTemp: string;
    MaxFeels: string;
    Wind: number;
    dayMaxScreenTemperature: number;
    dayMaxFeelsLikeTemp: number;
    daySignificantWeatherCode: number;
    WeatherIcon: JSX.Element;
    Description: string | { message: string; code: string };
}

export interface WeatherFeatures {
    geometry: {
        type: string;
        coordinates: number[];
    };
    properties: {
        location: {
            name: string;
        };
        requestPointDistance: number;
        modelRunDate: string;
        timeSeries: WeatherDay[];
    };
    type: string;
}

export interface WeatherRequest {
    days: WeatherDay[];
    features: WeatherFeatures[];
    location: string;
}

export interface Weather {
    DailyWeather: WeatherRequest;
    TodayWeather: WeatherDay;
    Location: string;
    Loaded: boolean;
}

export interface UI {
    Base: {
        HighlightFont: string;
    };
    SideBar: {
        Body: string;
        Child: string;
    };
}

export interface Props {
    Icon: Icons;
    isLoaded?: boolean;
    Notifications?: Notification;
    News?: News;
    Weather?: Weather;
    UI?: UI;
    Failed?: Function;
    Loading?: Function;
    Loaded?: Function;
}

export interface NavbarProps {
    Icon: Icons;
}

export interface IconProps {
    Icon: Icons;
}

export interface InfoProps {}
