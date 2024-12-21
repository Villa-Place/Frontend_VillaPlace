import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

// interface FetchData {
//   message: string;
//   status: string;
// }

const useFetchData = (url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<null | any>(null);
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
  }, []);

  return { data, loading, error };
};

export default useFetchData;
