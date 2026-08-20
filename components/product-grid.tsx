"use client"

import { forwardRef, useMemo, useState } from "react"
import { Search } from "lucide-react"
import {
  categories,
  products,
  type CategoryFilter,
} from "@/lib/products"
import { ProductCard } from "@/components/product-card"

type ProductGridProps = {
  category: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
}

export const ProductGrid = forwardRef<HTMLInputElement, ProductGridProps>(
  function ProductGrid({ category, onCategoryChange }, searchRef) {
    const [query, setQuery] = useState("")

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase()
      return products.filter((p) => {
        const matchesCategory = category === "Tous" || p.category === category
        const matchesQuery = `${p.name} ${p.sub}`.toLowerCase().includes(q)
        return matchesCategory && matchesQuery
      })
    }, [query, category])

    return (
      <section className="scroll-mt-24">
        <div className="mb-4 mt-9 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">
              Nos meilleures ventes
            </h2>
            <p className="mt-1 text-muted-foreground">
              Une sélection pensée pour démarrer.
            </p>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit…"
            className="w-full rounded-xl border border-border bg-card py-3.5 pl-11 pr-4 outline-none ring-primary/30 transition focus:ring-2"
          />
        </div>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const selected = cat === category
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`whitespace-nowrap rounded-full border px-4 py-2.5 font-semibold transition-colors ${
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card py-16 text-center text-muted-foreground">
            Aucun produit ne correspond à votre recherche.
          </div>
        )}
      </section>
    )
  },
)
