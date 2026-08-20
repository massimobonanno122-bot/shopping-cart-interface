"use client"

import { Search, ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart-provider"

type StoreHeaderProps = {
  onNavigate: (id: string) => void
  onSelectCategory: (category: string) => void
  onFocusSearch: () => void
}

const navItems = ["Téléphones", "Accessoires", "Confidentialité"]

export function StoreHeader({
  onNavigate,
  onSelectCategory,
  onFocusSearch,
}: StoreHeaderProps) {
  const { count, openCart } = useCart()

  return (
    <header className="sticky top-0 z-20 flex items-center gap-7 border-b border-border bg-background/90 px-[max(20px,5vw)] py-4 backdrop-blur-xl">
      <button
        onClick={() => onNavigate("top")}
        className="text-2xl font-black tracking-tight"
      >
        Gra<span className="text-primary">fen</span>store
      </button>

      <nav className="hidden flex-1 gap-5 md:flex">
        <button
          onClick={() => onNavigate("top")}
          className="font-bold text-muted-foreground transition-colors hover:text-foreground"
        >
          Accueil
        </button>
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onSelectCategory(item)}
            className="font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={onFocusSearch}
          aria-label="Rechercher"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-border bg-card transition-colors hover:bg-muted"
        >
          <Search className="h-[18px] w-[18px]" />
        </button>
        <button
          onClick={openCart}
          className="flex h-[42px] items-center gap-2 rounded-xl bg-foreground px-4 font-extrabold text-background transition-opacity hover:opacity-90"
        >
          <ShoppingBag className="h-[18px] w-[18px]" />
          Panier
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
            {count}
          </span>
        </button>
      </div>
    </header>
  )
}
