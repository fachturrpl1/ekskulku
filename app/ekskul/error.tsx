"use client";

import { useEffect } from "react";

export default function ErrorEkskul({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="max-w-md mx-auto mt-20 p-6 text-center rounded-xl border bg-white shadow-sm">
      <h2 className="text-xl font-bold text-red-600 mb-2">Terjadi Kesalahan!</h2>
      <p className="text-sm text-slate-600 mb-6">
        Gagal memuat daftar ekstrakurikuler. Silakan coba beberapa saat lagi.
      </p>
      <button
        onClick={() => reset()}
        className="rounded bg-red-600 px-4 py-2 text-sm text-white font-medium hover:bg-red-700 transition"
      >
        Coba lagi
      </button>
    </main>
  );
}