"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, Clock, X } from "lucide-react";
import { products, categories, brands } from "@/lib/constants";

interface Suggestion {
  type: "product" | "category" | "brand" | "recent";
  label: string;
  icon: string;
  href: string;
}

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("eb_recent_searches");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecent);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveRecentSearch = useCallback(
    (q: string) => {
      setRecentSearches((prev) => {
        const updated = [q, ...prev.filter((s) => s !== q)].slice(0, 5);
        localStorage.setItem("eb_recent_searches", JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const suggestions = useMemo(() => {
    if (!query.trim()) {
      return recentSearches.map((s) => ({
        type: "recent" as const,
        label: s,
        icon: "🕐",
        href: `/productos?q=${encodeURIComponent(s)}`,
      }));
    }

    const q = query.toLowerCase();
    const results: Suggestion[] = [];
    const seenLabels = new Set<string>();

    const addIfNew = (s: Suggestion) => {
      if (!seenLabels.has(s.label.toLowerCase())) {
        seenLabels.add(s.label.toLowerCase());
        results.push(s);
      }
    };

    products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
      .slice(0, 4)
      .forEach((p) =>
        addIfNew({
          type: "product",
          label: `${p.brand} ${p.name}`,
          icon: "📦",
          href: `/productos/${p.id}`,
        })
      );

    categories
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 3)
      .forEach((c) =>
        addIfNew({
          type: "category",
          label: c.name,
          icon: c.icon,
          href: `/categorias/${c.slug}`,
        })
      );

    brands
      .filter((b) => b.toLowerCase().includes(q))
      .slice(0, 3)
      .forEach((b) =>
        addIfNew({
          type: "brand",
          label: b,
          icon: "🏷️",
          href: `/productos?marca=${encodeURIComponent(b)}`,
        })
      );

    return results.slice(0, 8);
  }, [query, recentSearches]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query.trim());
      router.push(`/productos?q=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const s = suggestions[selectedIndex];
      saveRecentSearch(s.label);
      router.push(s.href);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const highlightMatch = (text: string, q: string) => {
    if (!q.trim()) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="font-bold text-primary">
          {text.slice(idx, idx + q.length)}
        </span>
        {text.slice(idx + q.length)}
      </>
    );
  };

  const showDropdown =
    isFocused && (query.trim().length > 0 || recentSearches.length > 0);
  const hasResults = suggestions.length > 0;

  return (
    <div
      ref={containerRef}
      className="relative flex-1 max-w-[500px] xl:max-w-[650px] mx-4"
    >
      <form onSubmit={handleSubmit}>
        <div
          className={`relative flex items-center bg-white rounded-full transition-all duration-300 ${
            isFocused
              ? "shadow-xl shadow-primary/8 ring-2 ring-primary/20 border-primary"
              : "shadow-md hover:shadow-lg border-border"
          } border`}
        >
          <div className="pl-4 sm:pl-5 pr-3 text-text-muted/50">
            <Search className="w-5 h-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar Smart TV, celulares, heladeras, parlantes..."
            className="flex-1 h-[52px] bg-transparent text-text placeholder-text-muted/50 text-sm sm:text-base font-medium focus:outline-none pr-3"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedIndex(-1);
              }}
              className="p-2 mr-1 text-text-muted/40 hover:text-text-muted transition-colors rounded-full hover:bg-bg-alt"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mr-1.5 w-[42px] h-[42px] bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-light transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
          >
            <Search className="w-[18px] h-[18px]" />
          </motion.button>
        </div>
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-border/60 overflow-hidden z-50 origin-top"
          >
            {!query.trim() && recentSearches.length > 0 && (
              <div className="px-4 pt-3 pb-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  Búsquedas recientes
                </div>
              </div>
            )}

            {query.trim() && hasResults && (
              <div className="px-4 pt-3 pb-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Sugerencias
                </div>
              </div>
            )}

            {query.trim() && !hasResults && (
              <div className="px-6 py-8 text-center">
                <div className="text-3xl mb-3">🔍</div>
                <p className="text-text-muted text-sm">
                  No encontramos resultados para{" "}
                  <span className="font-semibold text-text">
                    &quot;{query}&quot;
                  </span>
                </p>
                <p className="text-text-muted/60 text-xs mt-1">
                  Probá con otros términos
                </p>
              </div>
            )}

            {hasResults && (
              <div className="p-2">
                {suggestions.map((s, i) => (
                  <motion.button
                    key={`${s.type}-${s.label}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    type="button"
                    onClick={() => {
                      saveRecentSearch(s.label);
                      router.push(s.href);
                      setIsFocused(false);
                      inputRef.current?.blur();
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-150 text-left ${
                      selectedIndex === i
                        ? "bg-primary/5 text-primary"
                        : "text-text hover:bg-bg-alt"
                    }`}
                  >
                    <span className="text-lg shrink-0">{s.icon}</span>
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {s.type === "product" && query.trim() ? (
                        <span className="truncate font-medium">
                          {highlightMatch(s.label, query)}
                        </span>
                      ) : (
                        <span className="truncate font-medium">
                          {s.label}
                        </span>
                      )}
                      <span className="ml-auto text-[10px] text-text-muted/50 uppercase shrink-0">
                        {s.type === "product"
                          ? "Producto"
                          : s.type === "category"
                          ? "Categoría"
                          : s.type === "brand"
                          ? "Marca"
                          : ""}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {query.trim() && (
              <div className="px-4 py-2.5 border-t border-border/50 bg-bg-alt/50">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2 w-full py-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Buscar &quot;{query}&quot; en todos los productos
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
