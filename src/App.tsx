import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Body } from "./components";
import RenderProps from "./TS/props";

let welcomeCheck = false;

function App() {
    const props = RenderProps().props;
    const [mobileMenu, setMobileMenu] = useState(false);

    if (!welcomeCheck) {
        props.Notifications.custom("👋 Welcome!", "bottom-left");
        welcomeCheck = true;
    }

    return (
        <Router>
            <div className="absolute flex flex-col xl:flex-row xl:justify-between w-full h-max">
                <ToastContainer />
                <Navbar
                    {...props}
                    mobileMenu={mobileMenu}
                    setMobileMenu={setMobileMenu}
                />
                <Body {...props} mobileMenu={mobileMenu} />
            </div>
        </Router>
    );
}

export default App;
