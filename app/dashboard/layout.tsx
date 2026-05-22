import { AppSidebar } from "@/components/layout/AppSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="min-w-0 flex-1">
        <DashboardHeader />
        <main className="mx-auto w-full max-w-[1500px] p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
