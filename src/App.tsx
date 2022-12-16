import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import "./common/utils/socket";

import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
    Icon,
    LeftNavigationBar,
    NavigationBar,
    RightNavigationBar,
    Routes,
} from "src/components/";

const App = () => {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false);

    useEffect(() => {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            toast.dark("👋 Welcome!", {
                position: "bottom-left",
                draggable: true,
            });
        } else {
            toast("👋 Welcome!", { position: "bottom-left", draggable: true });
        }
    }, []);

    return (
        <Router>
            <div className="text-slate-800 dark:text-white">
                <ToastContainer />
                <div className="">
                    <NavigationBar />
                    <div className="w-full flex flex-col md:flex-row text-center justify-center min-w-[20rem]">
                        <LeftNavigationBar
                            Icon={Icon}
                            setMobileMenu={setMobileMenu}
                            mobileMenu={mobileMenu}
                        />
                        <div
                            className={`w-full md:max-w-4xl transition-all duration-150 ${
                                mobileMenu ? "opacity-40" : "opacity-100"
                            } px-2 sm:px-0 md:h-auto sm:border-l sm:border-r border-slate-300 dark:border-zinc-600/20`}
                        >
                            <Routes Icon={Icon} mobileMenu={mobileMenu} />
                        </div>
                        <RightNavigationBar />
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
