import { useEffect, useCallback, useState } from "react";
import { type TResponse } from "../utils/Response";

function useQuery<M>(fetcher: () => Promise<TResponse<M>>) {
  const [data, setData] = useState<M>(null!);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(null!);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const response = await fetcher();

    if (!response.ok) {
      setError(response.data as Error);
    } else {
      setData(response.data as M);
    }
    setIsLoading(false);
  }, [fetcher]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, data, error };
}

export default useQuery;
