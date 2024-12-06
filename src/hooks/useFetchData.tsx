import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

const useFetchData = (url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios(url, options);
        setData(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetchData;
