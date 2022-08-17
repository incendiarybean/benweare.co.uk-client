import { WeatherDay } from "@lib/types";
import React, { useEffect, useState } from "react";
import { sleep } from "src/TS/utils";

function Component({ Icon, Endpoint, MockData }: any) {
    const [weather, setWeather] = useState<WeatherDay[]>([]);
    const [loaded, setLoaded] = useState<boolean | string>(false);

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            if (MockData) {
                setWeather([MockData]);
            } else {
                setWeather([
                    {
                        midnight10MWindDirection: 1,
                        midnight10MWindGust: 1,
                        midnight10MWindSpeed: 1,
                        midnightMslp: 1,
                        midnightRelativeHumidity: 1,
                        midnightVisibility: 1,
                        nightLowerBoundMinFeelsLikeTemp: 1,
                        nightLowerBoundMinTemp: 1,
                        nightMinScreenTemperature: 1,
                        nightUpperBoundMinFeelsLikeTemp: 1,
                        nightUpperBoundMinTemp: 1,
                        time: "1",
                        Day: "1",
                        MaxTemp: "1",
                        LowTemp: "1",
                        MaxFeels: "1",
                        Wind: 0.1,
                        dayMaxScreenTemperature: 1,
                        dayMaxFeelsLikeTemp: 1,
                        daySignificantWeatherCode: 1,
                        WeatherIcon: <Icon.Sun />,
                        Description: "DEVELOPING",
                    },
                ]);
            }
            setLoaded(true);
            return;
        }

        const getNews = async () => {
            fetch(Endpoint)
                .then((data) => data.json())
                .then((data) => {
                    setWeather(data.gaming);
                })
                .catch((e) => {
                    setLoaded("Failed");
                    sleep(5000).then(getNews);
                });
        };

        getNews();
    }, [Endpoint, MockData, Icon.Sun, Icon]);
    console.log(weather, loaded);
    return <div></div>;
}

export default Component;
