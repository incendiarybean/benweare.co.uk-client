import { Route, Routes } from "react-router-dom";
import { BodyProps } from "src/common/types";
import Dashboard from "./pages/dashboard/dashboard";
import Info from "./pages/info/info";

const HomeRouter = (props: BodyProps) => {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard {...props} />} />
            <Route path="*" element={<Info {...props} />} />
        </Routes>
    );
};

export default HomeRouter;
