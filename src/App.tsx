import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Info, Dashboard } from "./components";
import RenderProps from "./TS/props";

let welcomeCheck = false;

function App() {
    const props = RenderProps().props;

    if (!welcomeCheck) {
        props.Notifications.custom("👋 Welcome!", "bottom-left");
        welcomeCheck = true;
    }

    return (
        <Router>
            <div className="absolute flex flex-col xl:flex-row xl:justify-between w-full h-max">
                <ToastContainer />
                <Navbar {...props} />
                <Routes>
                    <Route
                        path="/dashboard"
                        element={<Dashboard {...props} />}
                    />
                    <Route path="*" element={<Info {...props} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
