import { FC } from "react";
import { ApolloProvider as Apollo, InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@/utils";

type TApolloProvider = FC<{
  children: React.ReactNode;
}>;

const ApolloProvider: TApolloProvider = ({ children }) => {
  return <Apollo client={ApolloClient}>{children}</Apollo>;
};

export default ApolloProvider;
