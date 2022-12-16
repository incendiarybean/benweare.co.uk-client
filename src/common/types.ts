/* TYPES FOR CLIENT */
export interface Icons {
    Home: React.FunctionComponent;
    Info: React.FunctionComponent;
    RightArrow: React.FunctionComponent;
    RightCornerArrow: React.FunctionComponent;
    LeftArrow: React.FunctionComponent;
    DownArrow: React.FunctionComponent;
    UpArrow: React.FunctionComponent;
    Burger: React.FunctionComponent;
    Packages: React.FunctionComponent;
    OpenBox: React.FunctionComponent;
    Box: React.FunctionComponent;
    LoaderSmall: React.FunctionComponent;
    Newspaper: React.FunctionComponent;
    Sun: React.FunctionComponent;
    Cloud: React.FunctionComponent;
    Rain: React.FunctionComponent;
    Foggy: React.FunctionComponent;
    Thunder: React.FunctionComponent;
    Snow: React.FunctionComponent;
}

export interface NewsArticle {
    title: string;
    url: string;
    description?: string;
    img: string;
    date: string;
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
    site: string;
}

export interface NewsResponse {
    nasa: NasaArticle;
    pc: NewsArticle[];
    bbc: NewsArticle[];
}

export interface NewsCarousel {
    Icon: Icons;
    Endpoint: string;
    SiteName: string;
    Disabled: boolean;
}

export interface Card {
    Endpoint: string;
}

export type NewsCard = {
    SiteName: string;
} & Card;

export type WeatherCard = Card;

export interface NavbarProps {
    Icon: Icons;
    mobileMenu: boolean;
    setMobileMenu: React.Dispatch<boolean>;
}

export interface IconProps {
    Icon: Icons;
}

export interface BodyProps {
    Icon: Icons;
    mobileMenu: boolean;
}

export interface WeatherTimeSeries {
    time: string;
    Description: string;
    WeatherType: string;
    MaxTemp: string;
    LowTemp: string;
    MaxFeels: string;
    Wind: number;
    dayLowerBoundMaxFeelsLikeTemp: number;
    dayLowerBoundMaxTemp: number;
    dayMaxFeelsLikeTemp: number;
    dayMaxScreenTemperature: number;
    dayProbabilityOfHail: number;
    dayProbabilityOfHeavyRain: number;
    dayProbabilityOfHeavySnow: number;
    dayProbabilityOfPrecipitation: number;
    dayProbabilityOfRain: number;
    dayProbabilityOfSferics: number;
    dayProbabilityOfSnow: number;
    daySignificantWeatherCode: number;
    dayUpperBoundMaxFeelsLikeTemp: number;
    dayUpperBoundMaxTemp: number;
    maxUvIndex: number;
    midday10MWindDirection: number;
    midday10MWindGust: number;
    midday10MWindSpeed: number;
    middayMslp: number;
    middayRelativeHumidity: number;
    middayVisibility: number;
    midnight10MWindDirection: number;
    midnight10MWindGust: number;
    midnight10MWindSpeed: number;
    midnightMslp: number;
    midnightRelativeHumidity: number;
    midnightVisibility: number;
    nightLowerBoundMinFeelsLikeTemp: number;
    nightLowerBoundMinTemp: number;
    nightMinFeelsLikeTemp: number;
    nightMinScreenTemperature: number;
    nightProbabilityOfHail: number;
    nightProbabilityOfHeavyRain: number;
    nightProbabilityOfHeavySnow: number;
    nightProbabilityOfPrecipitation: number;
    nightProbabilityOfRain: number;
    nightProbabilityOfSferics: number;
    nightProbabilityOfSnow: number;
    nightSignificantWeatherCode: number;
    nightUpperBoundMinFeelsLikeTemp: number;
    nightUpperBoundMinTemp: number;
}
