import Link from "next/link";
import { ekskul, pendaftar } from '@/data/ekskul';
import KartuEkskul from '@/components/KartuEkskul';

export default function Beranda() {
  // Mengambil beberapa ekskul untuk ditampilkan di beranda
  const terdekat = ekskul.slice(0, 3);

  const hitungPendaftar = (id: number) => 
    pendaftar.filter((p) => p.ekskulId === id).length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Temukan ekskul seru di sekolahmu</h1>
        <p className="mt-3 text-slate-600">
          Olahraga, seni, akademik, dan teknologi. Pilih dan daftar kegiatannya di sini.
        </p>
        <Link
          href="/ekskul"
          className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700 transition"
        >
          Lihat semua ekskul
        </Link>
      </section>

      {/* Daftar Ekskul Pilihan */}
      <h2 className="mb-4 text-xl font-semibold text-slate-800">Ekskul Pilihan</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {terdekat.map((e) => (
          <KartuEkskul 
            key={e.id} 
            ekskul={e} 
            jumlahPendaftar={hitungPendaftar(e.id)} 
          />
        ))}
      </div>
    </div>
  );
}