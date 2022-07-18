import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { keys } from "../constants";

export const client = new ApolloClient({
  uri: `${keys.SERVER_URI}/resource`,
  cache: new InMemoryCache(),
});

export const ApolloConfig = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
