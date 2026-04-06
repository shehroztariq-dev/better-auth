import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import Topbar from "./_components/top-bar";
import FloatComponent from "@/components/float-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Topbar />
        <div className="p-10">{children}</div>
        <FloatComponent position="bottom-center" className="md:hidden block" />
      </main>
    </SidebarProvider>
  );
}
