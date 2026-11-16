import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: { default:"EkskulKu", template: "%s • EkskulKu" },
  description: "Katalog dan pendaftaran ekstrakurikuler sekolah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="antialiased"
    >
      <body 
      className={`flex min-h-screen flex-col bg-slate-50 text-slate-800`}>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="mx-auto w-full max-w-5xl flex-1 p-6">
          {children}
        </main>
        <footer className="border-t bg-white p-4 text-center text-sm text-slate-500">
          EkskulKu • dibuat di kelas Junior Web Developer
        </footer>
      </body>
    </html>
  );
}