"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { products, type Product } from "@/lib/products"

type CartState = Record<number, number>

type CartContextValue = {
  cart: CartState
  count: number
  total: number
  isOpen: boolean
  add: (id: number) => void
  change: (id: number, delta: number) => void
  remove: (id: number) => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const findProduct = (id: number): Product | undefined =>
  products.find((p) => p.id === id)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({})
  const [isOpen, setIsOpen] = useState(false)

  const add = (id: number) => {
    const product = findProduct(id)
    if (!product) return
    setCart((prev) => {
      const current = prev[id] ?? 0
      if (current >= product.stock) return prev
      return { ...prev, [id]: current + 1 }
    })
    setIsOpen(true)
  }

  const change = (id: number, delta: number) => {
    const product = findProduct(id)
    if (!product) return
    setCart((prev) => {
      const next = { ...prev }
      const value = (next[id] ?? 0) + delta
      if (value <= 0) {
        delete next[id]
      } else {
        next[id] = Math.min(value, product.stock)
      }
      return next
    })
  }

  const remove = (id: number) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const count = useMemo(
    () => Object.values(cart).reduce((a, b) => a + b, 0),
    [cart],
  )

  const total = useMemo(
    () =>
      Object.entries(cart).reduce((sum, [id, qty]) => {
        const product = findProduct(Number(id))
        return product ? sum + product.price * qty : sum
      }, 0),
    [cart],
  )

  const value: CartContextValue = {
    cart,
    count,
    total,
    isOpen,
    add,
    change,
    remove,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
