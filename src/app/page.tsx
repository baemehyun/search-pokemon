"use client";
import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";
import { PokemonList } from "./component/pokemon-list";
import SearchInput from "./component/search";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import PokemonResult from "./component/pokemon-result";

export const link = createHttpLink({
  uri: "https://graphql-pokemon2.vercel.app",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default function App() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const queryName = searchParam.get("name") || "";
  const [searchQuery, setSearchQuery] = useState(queryName);

  useEffect(() => {
    setSearchQuery(queryName);
  }, [queryName]);

  const handleSearch = (input: string) => {
    const params = new URLSearchParams();
    if (input) {
      params.set("name", input.toLowerCase());
    }
    router.push(`/?${params.toString()}`);
  };
  return (
    <>
      <ApolloProvider client={client}>
        <h2>Pokemon 🚀</h2>
        <h3>Charactor</h3>
        <SearchInput input={searchQuery} onSearch={handleSearch}></SearchInput>
        {queryName ? (
          <div>
            <PokemonResult name={queryName}></PokemonResult>
          </div>
        ) : (
          <div className="flex justify-center items-center py-12">
            <PokemonList />
          </div>
        )}
      </ApolloProvider>
    </>
  );
}
