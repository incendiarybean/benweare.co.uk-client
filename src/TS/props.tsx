import { NasaArticle, WeatherDay } from "@lib/types";
import React, { useEffect, useState } from "react";
import { toast, ToastPosition } from "react-toastify";
import * as Icon from "./icons";

if (process.env.NODE_ENV === "development") console.log(process.env);
console.log(process.env.REACT_APP_HOST);

const WEATHER_ENDPOINT = process.env.REACT_APP_WEATHER_ENDPOINT || "";
const NEWS_ENDPOINT = process.env.REACT_APP_NEWS_ENDPOINT || "";

function Functions() {
    /* News state and content */
    const [GamingArticles, setGamingArticles] = useState<HTMLElement[]>([]);
    const [NewsArticles, setNewsArticles] = useState<HTMLElement[]>([]);
    const [NasaArticles, setNasaArticles] = useState<NasaArticle>();
    const [NewsLoaded, setNewsLoaded] = useState<boolean | string>(false);

    /* Weather state and content */
    const [Location, setLocation] = useState<string>("");
    const [DailyWeather, setDailyWeather] = useState<WeatherDay[]>([]);
    const [TodayWeather, setTodayWeather] = useState<WeatherDay>();
    const [WeatherLoaded, setWeatherLoaded] = useState<boolean | string>(false);

    const props = {
        Icon,
        isLoaded: true,
        Notifications: {
            custom: (info: string, position: ToastPosition) => {
                toast.info(info, {
                    position: position,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
            error: (info: string, position: ToastPosition) => {
                toast.error(info, {
                    position: position,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
            success: (info: string, position: ToastPosition) => {
                toast.success(info, {
                    position: position,
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
        },
        News: {
            GamingArticles,
            NewsArticles,
            NasaArticles,
            Loaded: NewsLoaded,
        },
        Weather: {
            DailyWeather: DailyWeather,
            TodayWeather: TodayWeather,
            Location: Location,
            Loaded: WeatherLoaded,
        },
        UI: {
            Base: {
                HighlightFont: "mx-1 text-xs italic",
            },
            SideBar: {
                Body: "w-full rounded-lg h-full shadow-inner border border-slate-300",
                Child: "px-2 flex justify-between bg-white rounded-lg shadow z-50",
            },
        },
        Failed: () => {
            return (
                <div className="p-2 flex-initial">
                    <div className="w-full inline-flex text-slate-800bg-whiteleading-none rounded-full p-2 shadow text-sm">
                        <Icon.Failed />
                        <p className="items-center hover:text-blue-500 underline name inline-flex px-2 ">
                            Failed.
                        </p>
                    </div>
                </div>
            );
        },
        Loading: ({ name }: { name: string }) => {
            return (
                <div className="p-2 flex-initial">
                    <span className="w-full inline-flex text-slate-800bg-whiteleading-none rounded-full px-4 py-2 shadow text-sm">
                        <Icon.LoaderSmall />
                        <p className="items-center hover:text-blue-500 underline name inline-flex px-2 ">
                            Loading {name}...
                        </p>
                    </span>
                </div>
            );
        },
        Loaded: ({ url, name }: { url: string; name: string }) => {
            return (
                <div className="truncate w-auto p-2 flex-initial">
                    <div className="inline-flex text-slate-800 bg-whiteleading-none rounded-full p-2 border shadow-sm text-sm">
                        <Icon.Info />
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={url}
                            className="truncate items-center cursor-pointer hover:text-blue-500 underline name inline-flex px-2 "
                        >
                            Provided by {name}.
                        </a>
                    </div>
                </div>
            );
        },
    };

    // Used to reschedule fetch requests that failed
    const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        const getNews = async () => {
            fetch(NEWS_ENDPOINT)
                .then((data) => data.json())
                .then((data) => {
                    setGamingArticles(
                        (GamingArticles) => (GamingArticles = [])
                    );
                    setGamingArticles((GamingArticles) => [
                        ...GamingArticles,
                        ...data.gaming,
                    ]);

                    setNewsArticles((NewsArticles) => (NewsArticles = []));
                    setNewsArticles((NewsArticles) => [
                        ...NewsArticles,
                        ...data.news,
                    ]);

                    setNasaArticles(data.nasa);

                    setNewsLoaded(true);
                })
                .catch((e) => {
                    setNewsLoaded("Failed");
                    sleep(5000).then(getNews);
                });
        };

        const createDate = (rawDate: string) => {
            if (
                rawDate.toString().match(/[0-3][0-9]\/[0-1][0-12]\/[0-9][0-9]/g)
            ) {
                return rawDate;
            }

            const date = new Date(rawDate);
            const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];

            let dayPrefix = date.getDate().toString();
            switch (dayPrefix) {
                case "1":
                    dayPrefix = `${dayPrefix}st`;
                    break;
                case "2":
                    dayPrefix = `${dayPrefix}nd`;
                    break;
                case "3":
                    dayPrefix = `${dayPrefix}rd`;
                    break;
                default:
                    dayPrefix = `${dayPrefix}th`;
                    break;
            }

            return `${days[date.getDay()]} ${dayPrefix}, ${
                months[date.getMonth()]
            }`;
        };

        const weatherIcons = (
            weatherType: string,
            desc: string | { message: string; code: string }
        ) => {
            let todayWeather: JSX.Element = <Icon.Error />;
            let weatherDesc = desc;
            switch (weatherType) {
                case "cloud":
                    todayWeather = <Icon.Cloud />;
                    return { todayWeather, weatherDesc };
                case "sun":
                    todayWeather = <Icon.Sun />;
                    return { todayWeather, weatherDesc };
                case "rain":
                    todayWeather = <Icon.Rain />;
                    return { todayWeather, weatherDesc };
                case "snow":
                    todayWeather = <Icon.Snow />;
                    return { todayWeather, weatherDesc };
                case "thunder":
                    todayWeather = <Icon.Thunder />;
                    return { todayWeather, weatherDesc };
                case "foggy":
                    todayWeather = <Icon.Foggy />;
                    return { todayWeather, weatherDesc };
                case "error":
                    todayWeather = <Icon.Error />;
                    return {
                        todayWeather,
                        weatherDesc: "Something went wrong.",
                    };
                default:
                    return {
                        todayWeather,
                        weatherDesc,
                    };
            }
        };

        const weatherCode = (code: number) => {
            switch (code) {
                case 0:
                    return weatherIcons("sun", "Clear night");
                case 1:
                    return weatherIcons("sun", "Sunny day");
                case 2:
                    return weatherIcons("cloud", "Partly cloudy (night)");
                case 3:
                    return weatherIcons("cloud", "Partly cloudy (day)");
                case 5:
                    return weatherIcons("foggy", "Mist");
                case 6:
                    return weatherIcons("foggy", "Fog");
                case 7:
                    return weatherIcons("cloud", "Cloudy");
                case 8:
                    return weatherIcons("cloud", "Overcast");
                case 9:
                    return weatherIcons("rain", "Light rain shower (night)");
                case 10:
                    return weatherIcons("rain", "Light rain shower (day)");
                case 11:
                    return weatherIcons("rain", "Drizzle");
                case 12:
                    return weatherIcons("rain", "Light rain");
                case 13:
                    return weatherIcons("rain", "Heavy rain shower (night)");
                case 14:
                    return weatherIcons("rain", "Heavy rain shower (day)");
                case 15:
                    return weatherIcons("rain", "Heavy rain");
                case 16:
                    return weatherIcons("snow", "Sleet shower (night)");
                case 17:
                    return weatherIcons("snow", "Sleet shower (day)");
                case 18:
                    return weatherIcons("snow", "Sleet");
                case 19:
                    return weatherIcons("snow", "Hail shower (night)");
                case 20:
                    return weatherIcons("snow", "Hail shower (day)");
                case 21:
                    return weatherIcons("snow", "Hail");
                case 22:
                    return weatherIcons("snow", "Light snow shower (night)");
                case 23:
                    return weatherIcons("snow", "Light snow shower (day)");
                case 24:
                    return weatherIcons("snow", "Light snow");
                case 25:
                    return weatherIcons("snow", "Heavy snow shower (night)");
                case 26:
                    return weatherIcons("snow", "Heavy snow shower (day)");
                case 27:
                    return weatherIcons("snow", "Heavy snow");
                case 28:
                    return weatherIcons("thunder", "Thunder shower (night)");
                case 29:
                    return weatherIcons("thunder", "Thunder shower (day)");
                case 30:
                    return weatherIcons("thunder", "Thunder");
                default:
                    console.log("No handler for that response");
                    return weatherIcons("error", "error");
            }
        };

        const getWeather = async () => {
            fetch(WEATHER_ENDPOINT)
                .then((data) => data.json())
                .then((data) => {
                    if (data.code === 502) return console.log("Busy!");
                    setTodayWeather(TodayWeather);
                    setDailyWeather((DailyWeather) => (DailyWeather = []));
                    setLocation(data.location);
                    data.features[0].properties.timeSeries.map(
                        (data: WeatherDay) => {
                            const simpleDate = createDate(data.time);
                            data.Day = simpleDate;
                            data.MaxTemp = `${Math.round(
                                data.dayMaxScreenTemperature
                            )}º`;
                            data.LowTemp = `${Math.round(
                                data.nightMinScreenTemperature
                            )}º`;
                            data.MaxFeels = `${Math.round(
                                data.dayMaxFeelsLikeTemp
                            )}º`;
                            data.Wind = Math.round(data.midnight10MWindGust);
                            const desc = weatherCode(
                                data.daySignificantWeatherCode
                            );
                            data.WeatherIcon = desc.todayWeather;
                            data.Description = desc.weatherDesc;

                            // Set Today's weather
                            if (
                                new Date(data.time).toDateString() ===
                                new Date().toDateString()
                            ) {
                                setTodayWeather(data);
                            }

                            // Only add upcoming weather to array
                            if (
                                data.time < new Date().toISOString() ||
                                data.time.split("T")[0] ===
                                    new Date().toISOString().split("T")[0]
                            ) {
                                return null;
                            }
                            return setDailyWeather((DailyWeather) => [
                                ...DailyWeather,
                                data,
                            ]);
                        }
                    );
                    setWeatherLoaded(true);
                })
                .catch(() => {
                    setWeatherLoaded("Failed");
                    sleep(5000).then(getWeather);
                });
        };

        getNews();
        getWeather();

        setInterval(() => {
            getNews();
            getWeather();
        }, 900000);
    }, [TodayWeather]);

    return { props };
}

export default Functions;
