import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://1ac8-123-16-246-155.ap.ngrok.io",
    fetchOptions: {
      mode: "no-cors",
    },
  }),
  cache: new InMemoryCache(),
});

export const ApolloConfig = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
