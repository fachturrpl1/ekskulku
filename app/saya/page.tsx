import { Suspense } from "react";
import { type Metadata } from "next";
import KontenSaya from "@/components/KontenSaya";

export const metadata: Metadata = {
  title: "Ekskul Saya · EkskulKu",
};

export default function PageSaya() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-slate-900">Ekskul Saya</h1>
      
      {/* Bungkus dengan Suspense untuk mengatasi error blocking route */}
      <Suspense fallback={<p className="text-slate-400 text-sm italic">Memuat ekskul saya...</p>}>
        <KontenSaya />
      </Suspense>
    </main>
  );
}