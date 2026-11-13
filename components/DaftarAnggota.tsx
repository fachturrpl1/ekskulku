import { cookies } from "next/headers";
import { ambilAnggota } from "@/data/ambil";
import { ambilEkskul } from "@/data/ambil";

export default async function DaftarAnggota({ ekskulId }: { ekskulId: number }) {
  const [anggotaList, ekskulItem] = await Promise.all([
    ambilAnggota(ekskulId),
    ambilEkskul(ekskulId)
  ]);

  const cookieStore = await cookies();
  const namaCookie = cookieStore.get("nama")?.value ?? "";

  const kuotaTotal = ekskulItem?.kuota ?? 0;
  const jumlahTerisi = anggotaList.length;

  return (
    <div>
      <p className="text-sm font-medium text-slate-700 mb-3">
        {jumlahTerisi} dari {kuotaTotal} tempat terisi
      </p>

      {anggotaList.length === 0 ? (
        <p className="text-slate-500 italic text-sm">Belum ada anggota.</p>
      ) : (
        <ul className="divide-y divide-slate-100 border rounded-lg bg-white overflow-hidden">
          {anggotaList.map((p) => {
            const isKamu = p.nama.toLowerCase() === namaCookie.toLowerCase();
            return (
              <li key={p.nomor} className="flex items-center justify-between px-4 py-2.5 text-sm">
                <div>
                  <span className="font-medium text-slate-900">{p.nama}</span>
                  {isKamu && (
                    <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                      Kamu
                    </span>
                  )}
                  <p className="text-xs text-slate-500">{p.kelas}</p>
                </div>
                <span className="text-xs text-slate-400">#{p.nomor}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}