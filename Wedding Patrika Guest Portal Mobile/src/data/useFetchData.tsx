import { useState, useEffect, useRef } from 'react';
import { BASE_URL } from './endpoints';

const useFetchData: (url: string, method: "GET" | "POST", body: any) => any = (url, method = 'GET', body) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const cache = useRef<any>({});

    useEffect(() => {
        if (cache.current[url]) {
            setData(cache.current[url]);
            setIsLoading(false);
        } else {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    console.log(body)
                    const response = await fetch(
                        BASE_URL + url,
                        {
                            method: method,
                            body: JSON.stringify(body),
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                            }
                        });
                    const json = await response.json();
                    if (response.status === 400) {
                        console.log("error:", json);
                        setIsError(true);
                    }
                    else if (response.status === 200) {
                        console.log("success:", json);
                        cache.current[url] = json;
                    }
                    setData(json);
                } catch (error) {
                    console.log("error:", error);
                    setIsError(true);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [url]);

    return [data, isLoading, isError];
};

export default useFetchData;