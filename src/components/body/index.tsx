import { BodyProps } from "@lib/types";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard";
import Info from "../info";

function Component(props: BodyProps) {
    return (
        <div
            className={`w-full transition-all duration-150 ${
                props.mobileMenu ? "opacity-60" : "opacity-100"
            }`}
        >
            <Routes>
                <Route path="/dashboard" element={<Dashboard {...props} />} />
                <Route path="*" element={<Info {...props} />} />
            </Routes>
        </div>
    );
}

export default Component;
