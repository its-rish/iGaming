import { ApolloClient, InMemoryCache } from "@apollo/client";

export const CreateApolloClient = () => {
  const uri = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL;

  if (!uri) {
    throw new Error("STRAPI GraphQL endpoint is not defined in .env");
  }

  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};
