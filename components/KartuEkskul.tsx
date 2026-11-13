import Link from "next/link";
import { type Ekskul, JAM_SESI } from "@/data/ekskul";

type Props = {
  ekskul: Ekskul;
  jumlahPendaftar: number;
};

export default function KartuEkskul({ ekskul, jumlahPendaftar }: Props) {
  const sisa = ekskul.kuota - jumlahPendaftar;
  const isPenuh = sisa <= 0;

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
            {ekskul.kategori}
          </span>
          {isPenuh && (
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
              Penuh
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold">{ekskul.nama}</h3>
        
        <div className="mt-2 text-sm text-slate-600 space-y-1">
          <p>{ekskul.hari} • Sesi {ekskul.sesi} ({JAM_SESI[ekskul.sesi]})</p>
          <p>Pembina: <span className="font-medium text-slate-700">{ekskul.pembina}</span></p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t flex items-center justify-between">
        <p className={isPenuh ? "text-xs text-red-600 font-bold" : "text-xs text-slate-600"}>
          {isPenuh ? "Penuh" : `Sisa ${sisa} dari ${ekskul.kuota} tempat`}
        </p>
        
        <Link
          href={`/ekskul/${ekskul.id}`}
          className="rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 transition"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}