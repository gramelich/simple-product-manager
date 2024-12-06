import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardMetrics } from "@/components/DashboardMetrics";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <DashboardMetrics />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}