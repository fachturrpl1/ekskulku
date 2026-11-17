"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DAFTAR_KATEGORI, DAFTAR_HARI } from "@/data/ekskul";

export type KontrolKatalogProps = {
  kategori: string;
  hari: string;
  jumlahDitemukan: number;
};

export default function KontrolKatalog({
  kategori,
  hari,
  jumlahDitemukan,
}: KontrolKatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleKategoriChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "Semua") {
      params.delete("kategori");
    } else {
      params.set("kategori", val);
    }
    router.push(`/ekskul?${params.toString()}`);
  };

  const handleHariChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "Semua") {
      params.delete("hari");
    } else {
      params.set("hari", val);
    }
    router.push(`/ekskul?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4 rounded-xl border border-slate-300 bg-white p-4 shadow-sm items-center">
      {/* Saringan Kategori */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500">Kategori</label>
        <select
          value={kategori}
          onChange={(e) => handleKategoriChange(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
        >
          <option value="Semua">Semua kategori</option>
          {DAFTAR_KATEGORI.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      {/* Saringan Hari */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500">Hari</label>
        <select
          value={hari}
          onChange={(e) => handleHariChange(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
        >
          <option value="Semua">Semua hari</option>
          {DAFTAR_HARI.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full pt-2 border-t text-sm text-slate-600 font-medium">
        {jumlahDitemukan} ekskul ditemukan.
      </div>
    </div>
  );
}