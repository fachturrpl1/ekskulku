import { cookies } from "next/headers";
import Link from "next/link";
import { ekskul, JAM_SESI, pendaftar } from "@/data/ekskul";
import { batalkanPendaftaranAction } from "@/app/actions";

export default async function KontenSaya() {
  const cookieStore = await cookies();
  const nama = cookieStore.get("nama")?.value ?? "";
  const kelas = cookieStore.get("kelas")?.value ?? "";

  // 1. Kondisi tanpa cookie
  if (!nama || !kelas) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-600 mb-4">Kamu belum mendaftar apa pun.</p>
        <Link
          href="/ekskul"
          className="inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
        >
          Lihat Daftar Ekskul
        </Link>
      </div>
    );
  }

  // Cari ekskul yang diikuti oleh murid berdasarkan nama & kelas di cookie
  const pendaftaranSaya = pendaftar.filter(
    (p) =>
      p.nama.toLowerCase() === nama.toLowerCase() &&
      p.kelas.toLowerCase() === kelas.toLowerCase()
  );

  const ekskulSayaList = pendaftaranSaya
    .map((p) => {
      const item = ekskul.find((e) => e.id === p.ekskulId);
      return item ? { ...item, pendaftarId: p.nomor } : null;
    })
    .filter(Boolean);

  return (
    <div>
      {/* Ringkasan Identitas & Jumlah Ekskul */}
      <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            {nama} · <span className="text-slate-500 font-normal">{kelas}</span>
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            {ekskulSayaList.length} ekskul diikuti
          </p>
        </div>
      </div>

      {/* 2. Kondisi cookie ada tapi belum ada pendaftaran */}
      {ekskulSayaList.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500 italic mb-4">Belum ada ekskul yang diikuti.</p>
          <Link
            href="/ekskul"
            className="rounded bg-red-600 px-4 py-2 text-sm text-white font-medium hover:bg-red-700 transition"
          >
            Pilih Ekskul Sekarang
          </Link>
        </div>
      ) : (
        /* 3. Daftar ekskul yang diikuti dengan tombol Batalkan */
        <div className="space-y-4">
          {ekskulSayaList.map((item) => {
            if (!item) return null;
            return (
              <div
                key={item.pendaftarId}
                className="rounded-xl border bg-white p-4 shadow-sm flex items-center justify-between"
              >
                <div>
                  <span className="rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                    {item.kategori}
                  </span>
                  <h3 className="text-lg font-semibold mt-1">
                    <Link href={`/ekskul/${item.id}`} className="hover:text-red-600 transition">
                      {item.nama}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    📅 Setiap {item.hari}, Sesi {item.sesi} ({JAM_SESI[item.sesi]}) · Pembina: {item.pembina}
                  </p>
                </div>

                <form action={batalkanPendaftaranAction.bind(null, item.pendaftarId)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                  >
                    Batalkan
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}