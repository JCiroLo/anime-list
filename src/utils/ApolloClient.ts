import { ApolloClient as Client, InMemoryCache } from "@apollo/client";

const ApolloClient = new Client({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
});

export default ApolloClient;
