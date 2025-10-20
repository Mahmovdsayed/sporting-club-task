import { AppSidebar } from "@/components/dashboard/app-sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserDataDashboard } from "@/lib/fetcher";
import { User } from "@/types/user.types";

interface user {
    fullName: string;
    email: string;
    avatar: {
        url: string;
    };
    userName: string;
}

export default async function DashboardLayout({
    children,
}: { children: React.ReactNode; }) {

    const user: User = await getUserDataDashboard('/dashboard/user', 'dashboard-user');

    return <>
        <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
                <DashboardHeader />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    </>
}