import { useEffect, useCallback, useState } from "react";
import { type TResponse } from "../utils/Response";

type TUseRequest<M> = { isLoading: boolean; data: M | null; error: Error };

function useRequest<M, P = void>(fetcher: (params?: P) => Promise<TResponse<M>>, params?: P): TUseRequest<M> {
  const [data, setData] = useState<M>(null!);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(null!);

  const [memoParams] = useState(params);

  const fetchData = useCallback(
    async (params?: P) => {
      setIsLoading(true);

      const response = await fetcher(params);

      if (!response.ok) {
        setError(response.data as Error);
      } else {
        setData(response.data as M);
      }
      setIsLoading(false);
    },
    [fetcher]
  );

  useEffect(() => {
    console.log("re-render from useRequest");

    fetchData(memoParams);
  }, [fetchData, memoParams]);

  return { isLoading, data, error };
}

export default useRequest;
