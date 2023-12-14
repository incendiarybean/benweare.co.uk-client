import type { ArrowComponentProps } from '@common/types';
import { DownArrow, UpArrow } from '@icons';

const ArrowComponent = ({ display }: ArrowComponentProps) => {
    if (!display) {
        return <UpArrow />;
    }
    return <DownArrow />;
};

export default ArrowComponent;
