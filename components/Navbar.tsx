"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const menu = [
    { nama: "Beranda", href: "/" },
    { nama: "Daftar Ekskul", href: "/ekskul" },
    { nama: "Ekskul Saya", href: "/saya" },
  ];

  return (
    <nav className="flex items-center gap-6 border-b bg-white px-6 py-3 shadow-sm">
      <span className="text-lg font-bold text-red-600">EkskulKu</span>
      
      <div className="flex items-center gap-4 text-sm font-medium">
        {menu.map((m) => {
          // Bandingkan langsung dengan pathname dari Next.js
          const isActive = pathname === m.href;

          return (
            <Link
              key={m.href}
              href={m.href}
              className={`transition-colors ${
                isActive
                  ? "font-semibold text-red-600"
                  : "text-slate-600 hover:text-red-600"
              }`}
            >
              {m.nama}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}