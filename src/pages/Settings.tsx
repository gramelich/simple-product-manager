import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Settings() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p>Settings page content will be implemented here.</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}