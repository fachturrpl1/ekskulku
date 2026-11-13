"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ekskul, pendaftar, tambahPendaftar } from "@/data/ekskul";

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: {
    nama?: string;
    kelas?: string;
  };
  values?: {
    nama: string;
    kelas: string;
  };
};

export async function daftarEkskulAction(
  ekskulId: number,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const nama = (formData.get("nama") as string)?.trim() || "";
  const kelas = (formData.get("kelas") as string)?.trim() || "";

  // 1. Validasi per kolom (minimal 3 karakter)
  const errors: { nama?: string; kelas?: string } = {};
  if (nama.length < 3) {
    errors.nama = "Nama minimal 3 huruf.";
  }
  if (kelas.length < 3) {
    errors.kelas = "Kelas minimal 3 karakter.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, values: { nama, kelas } };
  }

  // 2. Periksa ekskul ada atau tidak
  const targetEkskul = ekskul.find((e) => e.id === ekskulId);
  if (!targetEkskul) {
    return { success: false, message: "ID ekskul tidak valid.", values: { nama, kelas } };
  }

  // 3. Periksa apakah sudah terdaftar di ekskul ini (case-insensitive)
  const sudahAda = pendaftar.some(
    (p) =>
      p.ekskulId === ekskulId &&
      p.nama.toLowerCase() === nama.toLowerCase() &&
      p.kelas.toLowerCase() === kelas.toLowerCase()
  );
  if (sudahAda) {
    return {
      success: false,
      message: `Anda sudah terdaftar di ekskul ${targetEkskul.nama}.`,
      values: { nama, kelas },
    };
  }

  // 4. Periksa kuota penuh
  const jumlahTerisi = pendaftar.filter((p) => p.ekskulId === ekskulId).length;
  if (jumlahTerisi >= targetEkskul.kuota) {
    return {
      success: false,
      message: `Kuota ${targetEkskul.nama} sudah penuh (${targetEkskul.kuota} orang).`,
      values: { nama, kelas },
    };
  }

  // 5. Periksa bentrok jadwal (hari dan sesi yang sama pada siswa yang sama)
  // Mencari ekskul lain yang diikuti oleh nama & kelas ini di hari & sesi yang sama
  const ekskulDiikutiSiswa = pendaftar
    .filter((p) => p.nama.toLowerCase() === nama.toLowerCase())
    .map((p) => ekskul.find((e) => e.id === p.ekskulId))
    .filter(Boolean);

  const bentrok = ekskulDiikutiSiswa.some(
    (e) => e && e.hari === targetEkskul.hari && e.sesi === targetEkskul.sesi
  );

  if (bentrok) {
    return {
      success: false,
      message: `Jadwal bentrok dengan ekskul lain pada hari ${targetEkskul.hari}, sesi ${targetEkskul.sesi}.`,
      values: { nama, kelas },
    };
  }

  // 6. Proses Pendaftaran Berhasil
  const nomorBaru = tambahPendaftar({ ekskulId, nama, kelas });

  // Simpan nama dan kelas ke cookie agar terisi otomatis
  const cookieStore = await cookies();
  cookieStore.set("nama", nama, { path: "/", maxAge: 86400 });
  cookieStore.set("kelas", kelas, { path: "/", maxAge: 86400 });

  // Revalidate halaman agar data langsung berubah tanpa F5
  revalidatePath(`/ekskul/${ekskulId}`);
  revalidatePath(`/ekskul`);

  const jamSesiStr = targetEkskul.sesi === 1 ? "15.00-16.30" : "16.30-18.00";

  return {
    success: true,
    message: `Pendaftaran #${nomorBaru} berhasil: ${targetEkskul.nama}, ${targetEkskul.hari}, sesi ${targetEkskul.sesi} (${jamSesiStr}).`,
    values: { nama, kelas },
  };
}