import AddNewMember from "@/components/forms/AddNewMember";
import ContainerLayout from "@/components/layout/ContainerLayout";
import TextHeader from "@/components/layout/TextHeader";
import MembersDashboard from "@/components/sections/MembersDashboard";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Members Dashboard",
    description: "Manage your members here.",
    openGraph: {
        title: "Members Dashboard",
        description: "Manage your members here.",
    },
    twitter: {
        title: "Members Dashboard",
        description: "Manage your members here.",
    }
};

const page = () => {
    return <>
        <ContainerLayout>
            <div className="flex items-center justify-between">
                <TextHeader
                    title="Members"
                    description="Manage your members here."
                    isDashboard
                />
                <AddNewMember />
            </div>
            <MembersDashboard />
        </ContainerLayout>
    </>;
};

export default page;