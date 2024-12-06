import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Customers() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Customers</h1>
            <p>Customers page content will be implemented here.</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}