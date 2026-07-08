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
    <form onSubmit={handleSubmit} className="relative flex-1 max-w-3xl mx-4">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscá productos, marcas, categorías..."
          className="w-full pl-6 pr-14 py-3.5 bg-bg-alt border-2 border-border rounded-2xl text-text placeholder-text-muted/70 focus:outline-none focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary/5 transition-all duration-300 text-base font-medium"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-xl hover:bg-primary-light transition-all duration-200 group-hover:shadow-lg group-hover:shadow-primary/20"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
