"use client";

import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";

interface SearchInputProps {
  input: string;
  onSearch: (query: string) => void;
}

export default function SearchInput({ input, onSearch }: SearchInputProps) {
  const [query, setQuery] = useState(input);

  useEffect(() => {
    setQuery(input);
  }, [input]);

  const handleSearch = (value: string) => {
    onSearch(value.trim());
  };

  return (
    <div>
      <Search
        placeholder="Search Pokemon by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
        enterButton
        size="large"
        className="pokemon-search"
        allowClear
      />
    </div>
  );
}
