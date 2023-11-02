import { useEffect, useState } from "react"

export const useOrigin = () => {
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, []);

    const origin = typeof window.location.origin !== 'undefined' ? window.location.origin : '';

    if (!mount) return null;

    return origin;
}