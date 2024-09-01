import { FC } from "react";
import { ApolloProvider as Apollo, ApolloClient, InMemoryCache } from "@apollo/client";

type TApolloProvider = FC<{
  children: React.ReactNode;
}>;

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
});

const ApolloProvider: TApolloProvider = ({ children }) => {
  return <Apollo client={client}>{children}</Apollo>;
};

export default ApolloProvider;
