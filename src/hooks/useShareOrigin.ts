"use client";

import { useEffect, useState } from "react";

const useShareOrigin = () => {
    const [origin, setOrigin] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const envOrigin = process.env.NEXT_PUBLIC_SITE_URL;
            setOrigin(envOrigin || window.location.origin);
        }
    }, []);

    return origin;
};

export default useShareOrigin;
