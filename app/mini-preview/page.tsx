import Link from "next/link";
import { MiniAppPreview } from "@/components/mini/MiniAppPreview";

export default function MiniPreviewPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto mb-6 max-w-5xl">
        <Link className="text-sm font-bold text-cyan-700" href="/">← Back to MiniShop Pro</Link>
        <h1 className="mt-3 text-3xl font-black">MiniShop Pro H5 Preview</h1>
        <p className="mt-2 max-w-3xl text-slate-600">This is a browser simulation of the WeChat Mini Program build. Recruiters can explore the mini-program user flow without WeChat DevTools. Demo payment simulation only. No real payment is processed.</p>
      </div>
      <MiniAppPreview />
    </main>
  );
}
