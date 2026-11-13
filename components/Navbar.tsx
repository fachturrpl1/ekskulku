"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
    { href: "/", teks: "Beranda" },
    { href: "/ekskul", teks: "Ekskul" },
    { href: "/tentang", teks: "Tentang" },
    { href: "/kontak", teks: "Kontak" },
    { href: '/favorit', teks: "Favorit" },
    { href: '/pendaftaran', teks: 'Pendaftaran' },
];

export default function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="flex items-center gap-6 border-b bg-white px-6 py-3">
            <span className="text-lg font-bold text-red-600">
                EkskulKu
            </span>
            {menu.map((m) => (
            <Link
                key={m.href}
                href={m.href}
                className={
                    pathname === m.href
                    ? "font-semibold text-red-600"
                    : "text-slate-600 hover:text-red-600"
                }
            >
                {m.teks}
            </Link>
            ))}
        </nav>
    );
}