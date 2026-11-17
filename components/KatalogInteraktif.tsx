"use client";

import { useSearchParams } from "next/navigation";
import { type Ekskul, pendaftar } from "@/data/ekskul";
import KartuEkskul from "./KartuEkskul";
import KontrolKatalogEkskul from "./KontrolKatalog";

export default function KatalogInteraktifEkskul({ ekskul }: { ekskul: Ekskul[] }) {
  // const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil nilai langsung dari URL searchParams (tidak perlu useState & useEffect)
  const kategori = searchParams.get("kategori") || "Semua";
  const hari = searchParams.get("hari") || "Semua";

  // Handler ubah kategori & update URL
  // const handleKategoriChange = (val: string) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   if (val === "Semua") {
  //     params.delete("kategori");
  //   } else {
  //     params.set("kategori", val);
  //   }
  //   router.push(`/ekskul?${params.toString()}`);
  // };

  // // Handler ubah hari & update URL
  // const handleHariChange = (val: string) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   if (val === "Semua") {
  //     params.delete("hari");
  //   } else {
  //     params.set("hari", val);
  //   }
  //   router.push(`/ekskul?${params.toString()}`);
  // };

  const hitungPendaftar = (id: number) =>
    pendaftar.filter((p) => p.ekskulId === id).length;

  // Filter data berdasarkan parameter URL yang aktif
  const hasil = ekskul.filter((item) => {
    const matchKategori = kategori === "Semua" || item.kategori === kategori;
    const matchHari = hari === "Semua" || item.hari === hari;
    return matchKategori && matchHari;
  });

  return (
    <div>
      <KontrolKatalogEkskul
        kategori={kategori}
        hari={hari}
        jumlahDitemukan={hasil.length}
      />

      {hasil.length === 0 ? (
        <p className="text-slate-500 italic">Tidak ada ekskul yang cocok.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((item) => (
            <KartuEkskul
              key={item.id}
              ekskul={item}
              jumlahPendaftar={hitungPendaftar(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}