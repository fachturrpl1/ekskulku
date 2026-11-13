import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ekskul, JAM_SESI } from "@/data/ekskul";
import { ambilEkskul } from "@/data/ambil";
import FormPendaftaran from "@/components/FormPendaftaran";
import DaftarAnggota from "@/components/DaftarAnggota";
import { type Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const item = ekskul.find((e) => e.id === Number(id));
    if (!item) return { title: 'Ekskul tidak ditemukan · EkskulKu' };
    return {
        title: `${item.nama} · EkskulKu`,
    };
}

export default async function DetailEkskul({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await ambilEkskul(Number(id));
    if (!item) notFound();

    const cookieStore = await cookies();
    const namaAwal = cookieStore.get("nama")?.value ?? "";
    const kelasAwal = cookieStore.get("kelas")?.value ?? "";

    return (
        <article className="max-w-3xl mx-auto p-6 rounded-xl border bg-white shadow-sm my-6">
            <div className="mb-3">
                <span className="rounded bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                    {item.kategori}
                </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">{item.nama}</h1>
            
            <div className="mt-3 text-slate-600 space-y-1 text-sm border-t border-b py-3 my-4">
                <p>
                    <span className="font-medium text-slate-800">Jadwal:</span> Setiap {item.hari}, Sesi {item.sesi} ({JAM_SESI[item.sesi]})</p>
                <p>
                    <span className="font-medium text-slate-800">Pembina:</span> {item.pembina}</p>
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Formulir Pendaftaran</h2>
                <FormPendaftaran ekskul={item} namaAwal={namaAwal} kelasAwal={kelasAwal} />
            </div>

            <section className="mt-8 border-t pt-6">
                <h2 className="font-semibold text-lg mb-3">Anggota Terdaftar</h2>
                <Suspense fallback={<p className="text-slate-400 text-sm italic">Memuat anggota...</p>}>
                    <DaftarAnggota ekskulId={item.id} />
                </Suspense>
            </section>
        </article>
    );
}