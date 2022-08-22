import { toast, ToastPosition } from "react-toastify";
import * as Icon from "../components/shared/icons";

if (process.env.NODE_ENV === "development") console.log(process.env);

function Functions() {
    const props = {
        Icon,
        Notifications: {
            default: (text: string, position: ToastPosition) => {
                toast(text, {
                    position: position,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
            error: (info: string, position: ToastPosition) => {
                toast.error(info, {
                    position: position,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
        },
    };

    return { props };
}

export default Functions;
