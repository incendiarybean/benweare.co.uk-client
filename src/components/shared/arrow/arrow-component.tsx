import { DownArrow, UpArrow } from '@icons';

const ArrowComponent = ({
    upwardFacing,
}: {
    /** A value depicting which direction the arrow is facing */
    upwardFacing: boolean;
}) => {
    if (!upwardFacing) {
        return <UpArrow />;
    }
    return <DownArrow />;
};

export default ArrowComponent;
