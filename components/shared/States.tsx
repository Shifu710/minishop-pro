import { AlertCircle, Loader2, PackageOpen } from "lucide-react";

export function EmptyState({ title }: { title: string }) {
  return (
    <div className="panel grid min-h-48 place-items-center p-8 text-center">
      <div>
        <PackageOpen className="mx-auto text-cyan-600" />
        <p className="mt-3 font-bold">{title}</p>
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="panel grid gap-3 p-5">
      <Loader2 className="animate-spin text-cyan-600" />
      <div className="h-4 w-2/3 rounded-full bg-slate-100" />
      <div className="h-4 w-1/2 rounded-full bg-slate-100" />
      <div className="h-24 rounded-2xl bg-slate-100" />
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="panel flex items-center gap-3 p-5 text-rose-600">
      <AlertCircle />
      <span>{message}</span>
    </div>
  );
}
