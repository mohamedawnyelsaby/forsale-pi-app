"use client"

import { Mic } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="card">
      <div className="search-row">
        <input
          type="text"
          placeholder="ابحث عن منتجات AI..."
          onChange={(e) => onSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            background: "transparent",
            color: "var(--text)",
            outline: "none",
            border: "2px solid transparent",
            boxShadow: "0 0 5px rgba(255, 212, 0, 0.12)",
            fontSize: "16px",
            transition: "border-color 0.2s",
          }}
        />
        <button className="mic">
          <Mic size={18} />
        </button>
      </div>
    </div>
  )
}
