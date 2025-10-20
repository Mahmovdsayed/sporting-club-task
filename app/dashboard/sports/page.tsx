import AddNewSport from "@/components/forms/AddNewSport";
import ContainerLayout from "@/components/layout/ContainerLayout";
import TextHeader from "@/components/layout/TextHeader";
import SportsDashboard from "@/components/sections/SportsDashboard";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Sports Dashboard",
    description: "Manage your Sports here.",
    openGraph: {
        title: "Sports Dashboard",
        description: "Manage your Sports here.",
    },
    twitter: {
        title: "Sports Dashboard",
        description: "Manage your Sports here.",
    }
};
const page = () => {
    return <>
        <ContainerLayout>
            <div className="flex items-center justify-between">
                <TextHeader
                    title="Sports"
                    description="Manage your sports here."
                    isDashboard
                />
                <AddNewSport />
            </div>
            <SportsDashboard />
        </ContainerLayout>
    </>;
};

export default page;