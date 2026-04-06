"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";

export function AppSidebar() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const handleLogout = () => {
    authClient.signOut();
    router.push("/");
  };

  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between h-12 border-b">
        Dashboard
        <SidebarTrigger className="md:hidden block" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">Dashboard</Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/profile">Profile </Link>
            </SidebarMenuButton>

            <SidebarMenuButton asChild>
              <Link href="/dashboard/admin">Admin </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/organization">Organization </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {session && (
          <div className="px-3 py-4 border-t">
            <div className="space-y-2">
              <div className="text-sm font-medium">{session.user?.name}</div>
              <div className="text-xs text-gray-500">{session.user?.email}</div>
              <Button
                onClick={handleLogout}
                variant="destructive"
                size="sm"
                className="w-full mt-2">
                Logout
              </Button>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
