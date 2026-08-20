export type Category = "Téléphones" | "Accessoires" | "Confidentialité"

export type Product = {
  id: number
  name: string
  sub: string
  category: Category
  price: number
  image: string
  stock: number
}

export const products: Product[] = [
  {
    id: 1,
    name: "Pixel 7a GrapheneOS",
    sub: "DéGooglé · 128 Go",
    category: "Téléphones",
    price: 249,
    image: "/products/pixel-7a.png",
    stock: 8,
  },
  {
    id: 2,
    name: "Pixel 8 GrapheneOS",
    sub: "DéGooglé · 128 Go",
    category: "Téléphones",
    price: 429,
    image: "/products/pixel-8.png",
    stock: 5,
  },
  {
    id: 3,
    name: "Pixel 8 Pro GrapheneOS",
    sub: "DéGooglé · 256 Go",
    category: "Téléphones",
    price: 599,
    image: "/products/pixel-8-pro.png",
    stock: 3,
  },
  {
    id: 4,
    name: "Coque renforcée",
    sub: "Protection antichoc",
    category: "Accessoires",
    price: 24.9,
    image: "/products/case.png",
    stock: 24,
  },
  {
    id: 5,
    name: "Câble USB-C 100 W",
    sub: "2 mètres · tressé",
    category: "Accessoires",
    price: 19.9,
    image: "/products/cable.png",
    stock: 40,
  },
  {
    id: 6,
    name: "Clé USB chiffrée",
    sub: "Stockage sécurisé 64 Go",
    category: "Confidentialité",
    price: 49.9,
    image: "/products/usb-key.png",
    stock: 12,
  },
  {
    id: 7,
    name: "Pixel 6a reconditionné",
    sub: "Grade A · 128 Go",
    category: "Téléphones",
    price: 179,
    image: "/products/pixel-6a.png",
    stock: 6,
  },
  {
    id: 8,
    name: "Chargeur USB-C 45 W",
    sub: "Compact · GaN",
    category: "Accessoires",
    price: 29.9,
    image: "/products/charger.png",
    stock: 18,
  },
]

export const categories = [
  "Tous",
  "Téléphones",
  "Accessoires",
  "Confidentialité",
] as const

export type CategoryFilter = (typeof categories)[number]

export const eur = (n: number) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })
