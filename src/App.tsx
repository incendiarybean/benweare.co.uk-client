import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Routes } from "./components";
import RenderProps from "./TS/props";

let welcomeCheck = false;

function App() {
    const props = RenderProps().props;
    const [mobileMenu, setMobileMenu] = useState<boolean>(false);

    if (!welcomeCheck) {
        props.Notifications.default("👋 Welcome!", "bottom-left");
        welcomeCheck = true;
    }

    return (
        <Router>
            <div className="">
                <ToastContainer />
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 auto-cols-min text-center">
                    <Navbar
                        {...props}
                        setMobileMenu={setMobileMenu}
                        mobileMenu={mobileMenu}
                    />
                    <div
                        className={`min-w-fit w-full transition-all duration-150 ${
                            mobileMenu ? "opacity-40" : "opacity-100"
                        }`}
                    >
                        <Routes {...props} mobileMenu={mobileMenu} />
                    </div>
                    <div className="w-56 mt-12 divide-y divide-slate-300"></div>
                </div>
            </div>
        </Router>
    );
}

export default App;
