"use client"

import * as React from "react"
import {
  House,
  Trophy,
  UserCheck,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: House,
      isActive: false,
    },
    {
      title: "Sports",
      url: "/dashboard/sports",
      icon: Trophy,
    },
    {
      title: "Members",
      url: "/dashboard/members",
      icon: Users,
    },
    {
      title: "Subscriptions",
      url: "/dashboard/subscriptions",
      icon: UserCheck,
    },
  ],
}
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    fullName: string;
    email: string;
    imageUrl: string;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
