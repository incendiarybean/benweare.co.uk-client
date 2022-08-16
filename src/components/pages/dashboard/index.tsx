import { BodyProps } from "@lib/types";
import React from "react";
import {
    MOCK_BBC_NEWS_RESPONSE,
    MOCK_GAMING_NEWS_RESPONSE,
} from "src/TS/resource-data";
import { NewsCarousel, Footer, WeatherDay } from "../..";

function Component({ Icon, mobileMenu }: BodyProps) {
    return (
        <div className="select-none bg-gray-200 items-center flex flex-col">
            <NewsCarousel
                Icon={Icon}
                Endpoint={"/game-news"}
                MockData={MOCK_GAMING_NEWS_RESPONSE}
                SiteName="PCGamer"
                Disabled={mobileMenu}
            />
            <hr className="border-b border-slate-300 w-1/2 self-center lg:border-none" />
            <WeatherDay Icon={Icon} Endpoint={"/weather"} />
            <hr className="border-b border-slate-300 w-1/2 self-center lg:border-none" />
            <NewsCarousel
                Icon={Icon}
                Endpoint={"/bbc-news"}
                MockData={MOCK_BBC_NEWS_RESPONSE}
                SiteName="BBC"
                Disabled={mobileMenu}
            />
            <hr className="border-b border-slate-300 w-1/2 self-center lg:border-none" />
            <Footer Icon={Icon} />
        </div>
    );
}

export default Component;
