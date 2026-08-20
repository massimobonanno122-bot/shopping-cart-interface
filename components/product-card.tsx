"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { eur, type Product } from "@/lib/products"
import { useCart } from "@/components/cart-provider"

export function ProductCard({ product }: { product: Product }) {
  const { cart, add } = useCart()
  const inCart = cart[product.id] ?? 0
  const soldOut = inCart >= product.stock

  return (
    <article className="group flex flex-col rounded-[22px] border border-border bg-card p-3 transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
      <div className="relative grid h-[215px] place-items-center overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#f1eef8,#e8e4f1)]">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={280}
          height={280}
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="mx-1 mt-3 text-base font-bold">{product.name}</h3>
      <p className="mx-1 text-sm text-muted-foreground">{product.sub}</p>

      <div className="mx-1 mt-3 flex items-center justify-between">
        <span className="text-lg font-black">{eur(product.price)}</span>
        <span className="text-[11px] font-extrabold text-stock">
          ● {product.stock} en stock
        </span>
      </div>

      <button
        onClick={() => add(product.id)}
        disabled={soldOut}
        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-foreground py-3 font-extrabold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="h-4 w-4" />
        {soldOut ? "Stock atteint" : "Ajouter au panier"}
      </button>
    </article>
  )
}
