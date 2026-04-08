"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const handleLogout = () => {
    authClient.signOut();
    router.push("/");
  };

  const navLinks = [
    { name: "dashboard", title: "Dashboard", href: "/dashboard" },
    { name: "profile", title: "Profile", href: "/dashboard/profile" },
    { name: "admin", title: "Admin", href: "/dashboard/admin" },
    {
      name: "organization",
      title: "Organization",
      href: "/dashboard/organization",
    },
  ];

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
            {navLinks.map((nav) => (
              <SidebarMenuButton
                className={
                  path === nav.href
                    ? "bg-primary text-black hover:bg-primary hover:text-black"
                    : ""
                }
                key={nav.name}
                asChild>
                <Link href={nav.href}>{nav.title}</Link>
              </SidebarMenuButton>
            ))}
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
