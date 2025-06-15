// lib/ApolloProvider.tsx
"use client";


import { ApolloProvider } from "@apollo/client";
import { CreateApolloClient } from "./AplloProvider";

const client = CreateApolloClient();

export const CustomApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
