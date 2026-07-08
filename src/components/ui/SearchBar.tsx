"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/productos?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex-1 max-w-2xl mx-4"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos, marcas, categorías..."
        className="w-full pl-5 pr-12 py-2.5 bg-bg-alt border-2 border-border rounded-xl text-text placeholder-text-muted focus:outline-none focus:border-primary focus:bg-white transition-all duration-200 text-sm"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}
