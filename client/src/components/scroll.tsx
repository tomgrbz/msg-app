import {useEffect, useRef} from "react";

export const Scroll = () => {
    const elementRef = useRef() as any;
    useEffect(() => elementRef.current.scrollIntoView());
    return (<div ref={elementRef}>  </div>)
};