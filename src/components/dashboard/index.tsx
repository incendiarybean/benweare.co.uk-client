import { IconProps } from "@lib/types";
import React from "react";
import { Footer, GameArticles, NewsArticles } from "./addons";

function Component({ Icon }: IconProps) {
    return (
        <div className="w-full shadow-inner select-none flex flex-col bg-gray-200 items-center">
            <div className="grid grid-cols-3 gap-4 xl:p-7 w-full xl:w-2/3">
                <GameArticles Icon={Icon} />
                <NewsArticles Icon={Icon} />
            </div>
            <Footer Icon={Icon} />
        </div>
    );
}

export default Component;
