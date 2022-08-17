import { WeatherDay } from "@lib/types";
import React, { useEffect, useState } from "react";
import { sleep } from "src/TS/utils";

function Component({ Icon, Endpoint, MockData }: any) {
    const [weather, setWeather] = useState<WeatherDay[]>([]);
    const [loaded, setLoaded] = useState<boolean | string>(false);

    useEffect(() => {
        const getWeather = async () => {
            fetch(Endpoint)
                .then((data) => data.json())
                .then((data) => {
                    setWeather(data.gaming);
                })
                .catch((e) => {
                    setLoaded("Failed");
                    sleep(5000).then(getWeather);
                });
        };

        getWeather();
    }, [Endpoint, MockData, Icon.Sun, Icon]);
    console.log(weather, loaded);
    return <div></div>;
}

export default Component;
