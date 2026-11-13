import { type Metadata } from "next";
import { ambilSemuaEkskul } from "@/data/ambil";
import { pendaftar } from "@/data/ekskul";
import KartuEkskul from "@/components/KartuEkskul";
import KontrolKatalogEkskul from "@/components/KontrolKatalog";

export const metadata: Metadata = {
  title: "Daftar Ekskul · EkskulKu",
};

type PageProps = {
  searchParams: Promise<{
    cari?: string;
    kategori?: string;
    hari?: string;
  }>;
};

export default async function PageEkskul({ searchParams }: PageProps) {
  const { cari, kategori, hari } = await searchParams;
  const semuaEkskul = await ambilSemuaEkskul();

  const hitungPendaftar = (id: number) => 
    pendaftar.filter((p) => p.ekskulId === id).length;

  // Saring di server berdasarkan parameter URL (cari, kategori, hari)
  const hasilFilter = semuaEkskul.filter((item) => {
    const matchCari = !cari || 
      item.nama.toLowerCase().includes(cari.toLowerCase()) || 
      item.pembina.toLowerCase().includes(cari.toLowerCase());
    const matchKategori = !kategori || kategori === "Semua" || item.kategori === kategori;
    const matchHari = !hari || hari === "Semua" || item.hari === hari;
    
    return matchCari && matchKategori && matchHari;
  });

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-slate-900">Daftar Ekstrakurikuler</h1>
      
      <KontrolKatalogEkskul />

      <p className="text-sm font-medium text-slate-600 mb-4">
        {hasilFilter.length} ekskul ditemukan.
      </p>

      {hasilFilter.length === 0 ? (
        <p className="text-slate-500 italic">Tidak ada ekskul yang cocok.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasilFilter.map((item) => (
            <KartuEkskul
              key={item.id}
              ekskul={item}
              jumlahPendaftar={hitungPendaftar(item.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}