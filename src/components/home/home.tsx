import { Route, Routes } from 'react-router-dom';
import { Dashboard, Documentation, Info } from '..';

const HomeRouter = () => {
    return (
        <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/documentation' element={<Documentation />} />
            <Route path='*' element={<Info />} />
        </Routes>
    );
};

export default HomeRouter;
