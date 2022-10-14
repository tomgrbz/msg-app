import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        let controller = new AbortController()
        setLoading(true)
        fetch(url, {signal: controller.signal})
            .then(a=> a.json()).then(d=>setData(d))
            .catch((e: any)=> setError(e))
            .finally(()=> setLoading(false))

        return () => {
            controller.abort()
        }
    }, [url])
    return { loading, data, error }
}