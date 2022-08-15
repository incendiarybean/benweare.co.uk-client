import React, { useEffect } from "react";

/**
 * This function tracks the focus of an element
 * On loss of focus, e.g. another element is interacted with
 * it will return a boolean
 * @param ref The HTML element you're expecting to keep focus
 * @param focusContained useState function to set focus as false when focus is lost
 */
export const ExternalClickHandler = (
    ref: React.RefObject<HTMLDivElement>,
    focusContained: React.Dispatch<boolean>
) => {
    useEffect(() => {
        const handleClickOutside = ({ target }: MouseEvent) => {
            console.log(ref.current!.contains(target as Node));
            if (ref && ref.current && !ref.current.contains(target as Node)) {
                focusContained(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, focusContained]);
};
