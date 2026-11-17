"use client";

import React from "react";
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

  const ubahParam = (nama: "kategori" | "hari", val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "Semua") {
      params.delete(nama);
    } else {
      params.set(nama, val);
    }
    const query = params.toString();
    router.push(query ? `/ekskul?${query}` : "/ekskul");
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
      {/* Saringan Kategori */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="filter-kategori"
          className="text-xs font-medium text-slate-500"
        >
          Kategori
        </label>
        <select
          id="filter-kategori"
          value={kategori}
          onChange={(e) => ubahParam("kategori", e.target.value)}
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
        <label
          htmlFor="filter-hari"
          className="text-xs font-medium text-slate-500"
        >
          Hari
        </label>
        <select
          id="filter-hari"
          value={hari}
          onChange={(e) => ubahParam("hari", e.target.value)}
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

      <div className="w-full border-t pt-2 text-sm font-medium text-slate-600">
        {jumlahDitemukan} ekskul ditemukan.
      </div>
    </div>
  );
}