"use client"

import { useRef, useState } from "react"
import { CartProvider } from "@/components/cart-provider"
import { StoreHeader } from "@/components/store-header"
import { StoreHero } from "@/components/store-hero"
import { ProductGrid } from "@/components/product-grid"
import { CartDrawer } from "@/components/cart-drawer"
import type { CategoryFilter } from "@/lib/products"

const reviews = [
  "La boutique est très claire et le parcours d'achat est vraiment simple.",
  "J'ai trouvé exactement le téléphone que je cherchais, avec toutes les infos au même endroit.",
  "Une présentation beaucoup plus rassurante qu'une boutique générique.",
]

export default function Page() {
  const [category, setCategory] = useState<CategoryFilter>("Tous")
  const shopRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const scrollToShop = () =>
    shopRef.current?.scrollIntoView({ behavior: "smooth" })

  const navigate = (id: string) => {
    if (id === "top") topRef.current?.scrollIntoView({ behavior: "smooth" })
    else scrollToShop()
  }

  const selectCategory = (cat: string) => {
    setCategory(cat as CategoryFilter)
    scrollToShop()
  }

  const focusSearch = () => {
    scrollToShop()
    setTimeout(() => searchRef.current?.focus(), 400)
  }

  return (
    <CartProvider>
      <div ref={topRef} />
      <div className="bg-foreground py-2 text-center text-[13px] text-background">
        Livraison offerte dès 100 € · <b className="text-[#c7b7ff]">Paiement
        sécurisé</b> · 14 jours pour changer d&apos;avis
      </div>

      <StoreHeader
        onNavigate={navigate}
        onSelectCategory={selectCategory}
        onFocusSearch={focusSearch}
      />

      <main className="mx-auto max-w-[1240px] px-[5vw] pb-20 pt-7">
        <StoreHero onShop={scrollToShop} onSelectCategory={selectCategory} />

        <div ref={shopRef} className="scroll-mt-24">
          <ProductGrid category={category} onCategoryChange={setCategory} />
        </div>

        <section className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl border border-[#ddd3ff] bg-secondary p-7 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-black text-secondary-foreground">
              Votre confidentialité d&apos;abord
            </h3>
            <p className="mt-1 text-[#5d536d]">
              Des produits choisis pour réduire la dépendance aux écosystèmes
              publicitaires.
            </p>
          </div>
          <button
            onClick={() => selectCategory("Confidentialité")}
            className="shrink-0 rounded-xl bg-primary px-5 py-4 font-extrabold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explorer
          </button>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">
            Ils parlent de Grafenstore
          </h2>
          <p className="mt-1 text-muted-foreground">
            Une expérience simple, rapide et transparente.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {reviews.map((text) => (
              <figure
                key={text}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="tracking-[2px] text-primary">★★★★★</div>
                <blockquote className="mt-2 leading-relaxed text-[#4e4a54]">
                  {text}
                </blockquote>
                <figcaption className="mt-3 text-[13px] font-bold">
                  — Client vérifié
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-foreground px-[5vw] py-10 text-[#ddd]">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 md:flex-row">
          <div>
            <h3 className="text-lg font-black text-background">Grafenstore</h3>
            <p className="mt-2 max-w-lg leading-relaxed text-[#aaa]">
              Technologie, confidentialité et achat en ligne. Boutique
              indépendante.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-black text-background">
              Besoin d&apos;aide ?
            </h3>
            <p className="mt-2 leading-relaxed text-[#aaa]">
              Support · Livraison · Retours · Conditions de vente
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer />
    </CartProvider>
  )
}
