import Link from "next/link";
import { Suspense } from "react";
import { MiniAppPreview } from "@/components/mini/MiniAppPreview";

export default function MiniPreviewPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto mb-6 max-w-5xl">
        <Link className="text-sm font-bold text-cyan-700" href="/">← Back to MiniShop Pro</Link>
        <h1 className="mt-3 text-3xl font-black">MiniShop Pro H5 Preview</h1>
        <p className="mt-2 max-w-3xl text-slate-600">Live public shop at <Link className="text-cyan-700 underline" href="/t/demo-shop">/t/demo-shop</Link> with Style 1 and Style 2 switching.</p>
      </div>
      <Suspense fallback={<p className="text-center text-slate-500">Loading shop...</p>}>
        <MiniAppPreview />
      </Suspense>
    </main>
  );
}
