import { ChevronDown, ChevronDownContained, ChevronUp, ChevronUpContained } from '@icons';

const ArrowComponent = ({
    upwardFacing,
    container = true
}: {
    /** A value depicting which direction the arrow is facing */
    upwardFacing: boolean;
    /** A value depecting whether the chevron has a container or not */
    container?: boolean
}) => {
    const Up = container ? <ChevronDownContained /> : <ChevronDown />
    const Down = container ? <ChevronUpContained /> : <ChevronUp />

    if (!upwardFacing) {
        return Up;
    }
    return Down;
};

export default ArrowComponent;
