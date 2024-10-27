import { useCallback, useState } from "react";
import { useQuery as useApollo } from "@apollo/client";

import type { ApolloError, OperationVariables } from "@apollo/client";
import type { TQuery } from "@/queries/AnimeQueries";

type TUseAnimeQueryOptions = {
  variables?: OperationVariables;
  onCompleted: (data: unknown) => void;
};
type TUseAnimeQueryReturn<D = unknown> = {
  loading: boolean;
  error: ApolloError | undefined;
  data: D;
  refetch: () => Promise<void>;
};
type TUseAnimeQuery = <D>(query: TQuery, options: TUseAnimeQueryOptions) => TUseAnimeQueryReturn<D>;

const useQuery: TUseAnimeQuery = (query, options) => {
  const [page, setPage] = useState(1);

  const { loading, error, data, fetchMore } = useApollo(query, {
    variables: options.variables,
    onCompleted: (data) => options.onCompleted(data),
  });

  console.log(page);

  const refetch = useCallback(
    () =>
      new Promise<void>((resolve) => {
        fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;

            setPage((prev) => prev + 1);

            options.onCompleted(fetchMoreResult);

            resolve(fetchMoreResult);
          },
          variables: {
            page,
          },
        });
      }),
    [options, page, fetchMore]
  );

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export default useQuery;
