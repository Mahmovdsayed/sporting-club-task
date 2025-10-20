import ContainerLayout from "@/components/layout/ContainerLayout";
import TextHeader from "@/components/layout/TextHeader";
import DashBoardHome from "@/components/sections/DashBoardHome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your Dashboard here.",
  openGraph: {
    title: "Dashboard",
    description: "Manage your Dashboard here.",
  },
  twitter: {
    title: "Dashboard",
    description: "Manage your Dashboard here.",
  }
};

const page = () => {
  return <>
    <ContainerLayout>
      <TextHeader
        title="Dashboard"
        description="Welcome to your dashboard. Here you can manage your sports, members, and subscriptions."
        isDashboard
      />
      <DashBoardHome />
    </ContainerLayout>
  </>;
};

export default page;