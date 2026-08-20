"use client"

import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import { eur, products } from "@/lib/products"
import { useCart } from "@/components/cart-provider"

export function CartDrawer() {
  const { cart, total, isOpen, closeCart, change, remove } = useCart()
  const entries = Object.entries(cart)

  const checkout = () => {
    if (entries.length === 0) return
    alert(
      "Aperçu du checkout Grafenstore. Le paiement réel sera branché au serveur Stripe de production.",
    )
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? "visible" : "invisible"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-label="Votre panier"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-card shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="flex items-center gap-2 text-xl font-black">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Votre panier
          </h2>
          <button
            onClick={closeCart}
            aria-label="Fermer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-border"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-auto px-6">
          {entries.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 py-16 text-center text-muted-foreground">
              <ShoppingBag className="h-10 w-10 opacity-40" />
              <p className="font-semibold">Votre panier est vide.</p>
              <p className="text-sm">
                Découvrez nos produits pour commencer.
              </p>
            </div>
          ) : (
            entries.map(([id, qty]) => {
              const product = products.find((p) => p.id === Number(id))
              if (!product) return null
              return (
                <div
                  key={id}
                  className="flex gap-3 border-b border-border py-4"
                >
                  <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(145deg,#f1eef8,#e8e4f1)]">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain p-1.5"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-bold leading-tight">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {eur(product.price)}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-lg border border-border">
                        <button
                          onClick={() => change(product.id, -1)}
                          aria-label="Diminuer la quantité"
                          className="flex h-8 w-8 items-center justify-center rounded-l-lg transition-colors hover:bg-muted"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">
                          {qty}
                        </span>
                        <button
                          onClick={() => change(product.id, 1)}
                          disabled={qty >= product.stock}
                          aria-label="Augmenter la quantité"
                          className="flex h-8 w-8 items-center justify-center rounded-r-lg transition-colors hover:bg-muted disabled:opacity-40"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(product.id)}
                        aria-label="Retirer l'article"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <span className="font-black">
                    {eur(product.price * qty)}
                  </span>
                </div>
              )
            })
          )}
        </div>

        <div className="border-t border-border p-6">
          <div className="mb-4 flex items-center justify-between text-xl font-black">
            <span>Total</span>
            <span>{eur(total)}</span>
          </div>
          <button
            onClick={checkout}
            disabled={entries.length === 0}
            className="w-full rounded-xl bg-primary py-4 font-extrabold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Passer au paiement
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            Aperçu : le paiement réel sera effectué via Stripe lorsque le
            backend de production sera connecté.
          </p>
        </div>
      </aside>
    </div>
  )
}
