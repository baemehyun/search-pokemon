'use client'

import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { PokemonList } from "./component/pokemon-list";
import SearchInput from "./component/search";
import { useRouter } from "next/navigation";
import PokemonResult from "./component/pokemon-result";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://graphql-pokemon2.vercel.app",
});

export default function App() {
  const router = useRouter();
  let searchParams = new URLSearchParams('')

  if (typeof window !== "undefined") {
    searchParams = new URLSearchParams(window.location.search)
  }
  const [searchQuery, setSearchQuery] = useState(searchParams.get("name") || "");

  const handleSearch = (input: string) => {
    const params = new URLSearchParams();
    if (input) {
      params.set("name", input.toLowerCase());
    }
    router.push(`/?${params.toString()}`);
    setSearchQuery(input.toLowerCase());
  };

  return (
    <>
      <ApolloProvider client={client}>
        <h2>Pokemon 🚀</h2>
        <h3>Charactor</h3>
          <SearchInput input={searchQuery} onSearch={handleSearch}></SearchInput>
          {searchQuery ? (
            <div>
              <PokemonResult name={searchQuery}></PokemonResult>
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
