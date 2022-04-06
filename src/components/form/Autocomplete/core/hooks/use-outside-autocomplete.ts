import React, {useEffect} from "react";

export function useOutsideAutocomplete(ref: React.MutableRefObject<any>, onClickOutside?: ((isOutside: boolean) => void)) {

    function handleListener(this: Document, ev: MouseEvent)
    {
        if(onClickOutside)
        {
            if(ref.current && !ref.current.contains(ev.target))
            {
                onClickOutside(true);
            }
            else
            {
                onClickOutside(false);
            }
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleListener);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleListener);
        };
    }, [ref, onClickOutside]);
}
