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
  const resolvedParams = await searchParams;
  const cari = resolvedParams.cari ?? "";
  const kategori = resolvedParams.kategori ?? "Semua";
  const hari = resolvedParams.hari ?? "Semua";

  const semuaEkskul = await ambilSemuaEkskul();

  const hitungPendaftar = (id: number) => 
    pendaftar.filter((p) => p.ekskulId === id).length;

  // Saring di server berdasarkan parameter URL (cari, kategori, hari)
  const hasilFilter = semuaEkskul.filter((item) => {
    const matchCari = !cari || 
      item.nama.toLowerCase().includes(cari.toLowerCase()) || 
      item.pembina.toLowerCase().includes(cari.toLowerCase());
    const matchKategori = kategori === "Semua" || item.kategori === kategori;
    const matchHari = hari === "Semua" || item.hari === hari;
    
    return matchCari && matchKategori && matchHari;
  });

  // Fungsi server action / handler untuk mengubah URL saat filter diganti
  // (Karena router.push berjalan di klien, kita buatkan fungsi pembantu atau serahkan ke KontrolKatalog via URL Router)
  // Catatan: Karena KontrolKatalog menggunakan router.push di sisi klien, kita cukup kirim nilai string-nya saja.

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-slate-900">Daftar Ekstrakurikuler</h1>
      
      <KontrolKatalogEkskul
        kategori={kategori}
        setKategori={() => {}} // Ditangani langsung oleh router.push di dalam KontrolKatalog client component
        hari={hari}
        setHari={() => {}} // Ditangani langsung oleh router.push di dalam KontrolKatalog client component
        jumlahDitemukan={hasilFilter.length}
      />

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