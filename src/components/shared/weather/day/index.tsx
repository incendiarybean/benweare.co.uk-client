import { WeatherCard, WeatherTimeSeries } from "@lib/types";
import React, { useEffect, useState } from "react";
import { sleep } from "src/TS/utils";
import { Loader, Error, Icon } from "../../..";

function Component({ Endpoint }: WeatherCard) {
    const [weather, setArticle] = useState<WeatherTimeSeries>();
    const [loaded, setLoaded] = useState<boolean | string>(false);

    const getWeatherIcon = (type: string) => {
        switch (type) {
            case "cloud":
                return <Icon.Cloud />;
            case "sun":
                return <Icon.Sun />;
            case "rain":
                return <Icon.Rain />;
            case "snow":
                return <Icon.Snow />;
            case "thunder":
                return <Icon.Thunder />;
            case "foggy":
                return <Icon.Foggy />;
            default:
                return <Icon.Cloud />;
        }
    };

    useEffect(() => {
        const getDetail = async () => {
            fetch(Endpoint)
                .then((data) => data.json())
                .then((data) => {
                    const { day } = data;
                    setArticle(day);
                    console.log(data);
                    setLoaded(true);
                })
                .catch(() => {
                    setLoaded("Failed");
                    sleep(5000).then(getDetail);
                });
        };

        getDetail();
    }, [Endpoint]);

    return (
        <div className="pt-16 my-3 w-full">
            <div className="flex flex-col w-full justify-start md:p-4">
                {loaded === true && weather && (
                    <div className="flex items-center w-full bg-white dark:bg-slate-800 rounded-xl shadow">
                        <div className="bg-white dark:bg-slate-800 rounded-xl">
                            {getWeatherIcon(weather.WeatherType)}
                        </div>
                        <div className="w-full">
                            <p className="w-auto p-1 text-2xl rounded-full uppercase">
                                {weather.MaxFeels}
                            </p>
                            <p className="w-full -mt-2 rounded-full text-xs uppercase">
                                Feels Like
                            </p>
                        </div>
                    </div>
                )}
                {loaded === "Failed" && <Error />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
}

export default Component;
