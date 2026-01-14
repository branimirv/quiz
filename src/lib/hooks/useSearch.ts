import { useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

interface UseSearchOptions<T> {
  items: T[];
  searchFields: Array<keyof T>;
  debounceMs?: number;
}

interface UseSearchReturn<T> {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredItems: T[];
  isSearching: boolean;
  hasResults: boolean;
  resultsCount: number;
}

export function useSearch<T extends Record<string, unknown>>({
  items,
  searchFields,
  debounceMs = 300,
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return items;
    }

    const lowerSearchTerm = debouncedSearchTerm.toLocaleLowerCase().trim();

    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (typeof value === "string") {
          return value.toLocaleLowerCase().includes(lowerSearchTerm);
        }

        if (typeof value === "number") {
          return value.toString().includes(lowerSearchTerm);
        }
        return false;
      });
    });
  }, [items, debouncedSearchTerm, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    isSearching: searchTerm !== debouncedSearchTerm,
    hasResults: filteredItems.length > 0,
    resultsCount: filteredItems.length,
  };
}
