"use client";

import { useActionState } from "react";
import { daftarEkskulAction, type ActionState } from "@/app/actions";
import { type Ekskul } from "@/data/ekskul";

type Props = {
  ekskul: Ekskul;
  namaAwal: string;
  kelasAwal?: string;
};

const initialState: ActionState = {};

export default function FormPendaftaran({ ekskul, namaAwal, kelasAwal = "" }: Props) {
  const actionWithId = daftarEkskulAction.bind(null, ekskul.id);
  const [state, formAction, isPending] = useActionState(actionWithId, initialState);

  // Mempertahankan isian yang sudah diketik saat ada galat
  const defaultNama = state?.values?.nama ?? namaAwal;
  const defaultKelas = state?.values?.kelas ?? kelasAwal;

  return (
    <form action={formAction} className="space-y-4 rounded-xl border bg-slate-50 p-4">
      {/* Pesan Galat Umum atau Sukses di atas tombol */}
      {state?.message && (
        <div
          className={`p-3 rounded-lg text-sm font-medium ${
            state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      {/* Kolom Nama */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap</label>
        <input
          type="text"
          name="nama"
          defaultValue={defaultNama}
          required
          placeholder="Masukkan nama Anda"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
        />
        {state?.errors?.nama && (
          <p className="mt-1 text-xs text-red-600 font-medium">{state.errors.nama}</p>
        )}
      </div>

      {/* Kolom Kelas */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Kelas</label>
        <input
          type="text"
          name="kelas"
          defaultValue={defaultKelas}
          required
          placeholder="Contoh: XI RPL 1"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
        />
        {state?.errors?.kelas && (
          <p className="mt-1 text-xs text-red-600 font-medium">{state.errors.kelas}</p>
        )}
      </div>

      {/* Tombol Berubah Menjadi "Memproses..." saat pending */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition disabled:opacity-50"
      >
        {isPending ? "Memproses..." : "Daftar Ekskul ini"}
      </button>
    </form>
  );
}