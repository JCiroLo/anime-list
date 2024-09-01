import { useCallback, useState } from "react";
import { type TResponse } from "../utils/Response";

type TUseLazyRequest<M> = [() => void, { isLoading: boolean; data: M | null; error: Error }];

function useLazyRequest<M, P = void>(fetcher: (params?: P) => Promise<TResponse<M>>, params?: P): TUseLazyRequest<M> {
  const [data, setData] = useState<M | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(null!);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const response = await fetcher(params);

    if (!response.ok) {
      setError(response.data as Error);
    } else {
      setData(response.data as M);
    }
    setIsLoading(false);
  }, [fetcher, params]);

  return [fetchData, { isLoading, data, error }];
}

export default useLazyRequest;
