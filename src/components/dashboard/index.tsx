import { IconProps } from "@lib/types";
import React from "react";
import { Footer } from "./addons";

function Component({ Icon }: IconProps) {
    return (
        <div className="h-full w-full shadow-inner select-none flex flex-col justify-center bg-slate-100">
            <div className="grid grid-cols-1 gap-4 p-7 w-2/3"></div>
            <Footer Icon={Icon} />
        </div>
    );
}

export default Component;
