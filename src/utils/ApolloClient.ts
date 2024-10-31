import { ApolloClient as Client, InMemoryCache } from "@apollo/client";

import Env from "./Env";

const ApolloClient = new Client({
  uri: Env.API_URL,
  cache: new InMemoryCache(),
});

export default ApolloClient;
