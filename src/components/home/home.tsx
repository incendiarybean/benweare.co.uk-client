import { Route, Routes } from 'react-router-dom';
import { BodyProps } from 'src/common/types';
import { Dashboard, Documentation, Info } from '..';

const HomeRouter = (props: BodyProps) => {
    return (
        <Routes>
            <Route path='/dashboard' element={<Dashboard {...props} />} />
            <Route path='/documentation' element={<Documentation />} />
            <Route path='*' element={<Info />} />
        </Routes>
    );
};

export default HomeRouter;
