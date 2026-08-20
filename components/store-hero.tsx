"use client"

import { Fingerprint, Lock, Package, RotateCcw, ShieldCheck } from "lucide-react"

type StoreHeroProps = {
  onShop: () => void
  onSelectCategory: (category: string) => void
}

const trust = [
  { icon: Lock, label: "Paiement sécurisé" },
  { icon: Package, label: "Stock disponible" },
  { icon: RotateCcw, label: "Retours 14 jours" },
  { icon: ShieldCheck, label: "Support client" },
]

export function StoreHero({ onShop, onSelectCategory }: StoreHeroProps) {
  return (
    <>
      <section className="relative grid min-h-[500px] items-center gap-10 overflow-hidden rounded-[34px] bg-[radial-gradient(circle_at_78%_20%,#7650d8_0,#35156d_30%,#15121b_72%)] p-8 text-white md:grid-cols-[1.1fr_.9fr] md:p-14">
        <div className="relative z-10">
          <p className="text-xs font-extrabold uppercase tracking-[1.5px] text-[#c9baff]">
            Grafenstore · technologie privée
          </p>
          <h1 className="my-4 text-balance text-5xl font-black leading-[0.93] tracking-tight md:text-7xl">
            La technologie.
            <br />
            <span className="text-[#b79cff]">Sans compromis.</span>
          </h1>
          <p className="max-w-xl text-pretty leading-relaxed text-[#ddd6e8]">
            Smartphones déGooglés, accessoires et solutions orientées
            confidentialité. Une expérience simple, indépendante et pensée pour
            acheter en toute confiance.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={onShop}
              className="rounded-xl bg-primary px-5 py-4 font-extrabold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Voir les produits
            </button>
            <button
              onClick={() => onSelectCategory("Téléphones")}
              className="hidden rounded-xl bg-white px-5 py-4 font-extrabold text-[#111] transition-opacity hover:opacity-90 sm:block"
            >
              Découvrir les smartphones
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute right-[7%] top-[10%] hidden h-[380px] w-[380px] rounded-full border border-white/15 shadow-[0_0_0_45px_rgba(255,255,255,0.03),0_0_0_90px_rgba(255,255,255,0.02)] md:block" />

        <div className="relative z-10 hidden justify-self-center md:flex">
          <div className="grid h-[450px] w-[235px] place-items-center rounded-[38px] border-[5px] border-[#777] bg-[linear-gradient(145deg,#222,#050505)] shadow-[0_35px_70px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col items-center text-center">
              <Fingerprint className="h-14 w-14 text-[#b79cff]" />
              <div className="mt-2 font-extrabold">GrafenOS</div>
              <div className="text-xs tracking-widest text-[#8d63ff]">
                PRIVACY FIRST
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-[18px] grid grid-cols-2 gap-[10px] md:grid-cols-4">
        {trust.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-2xl border border-border bg-card p-4 text-sm font-semibold"
          >
            <Icon className="h-5 w-5 text-primary" />
            {label}
          </div>
        ))}
      </div>
    </>
  )
}
