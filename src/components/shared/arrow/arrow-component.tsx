import { Icon } from 'src/components';

function ArrowComponent({ display }: { display: boolean }) {
    if (!display) {
        return <Icon.UpArrow />;
    }
    return <Icon.DownArrow />;
}

export default ArrowComponent;
