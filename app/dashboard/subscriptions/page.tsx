import SubscriptionForm from "@/components/forms/SubscriptionForm";
import ContainerLayout from "@/components/layout/ContainerLayout";
import TextHeader from "@/components/layout/TextHeader";
import SubscriptionsDashboard from "@/components/sections/SubscriptionsDashboard";
import { getUserDataDashboard } from "@/lib/fetcher";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Subscriptions Dashboard",
    description: "Manage your Subscriptions here.",
    openGraph: {
        title: "Subscriptions Dashboard",
        description: "Manage your Subscriptions here.",
    },
    twitter: {
        title: "Subscriptions Dashboard",
        description: "Manage your Subscriptions here.",
    }
};

const page = async () => {
    const sports = await getUserDataDashboard("/dashboard/sports", "sports-dashboard")
    const members = await getUserDataDashboard("/dashboard/members", "members-dashboard")

    return <>
        <ContainerLayout>
            <TextHeader
                title="Subscriptions Management"
                description="Manage your subscriptions here."
                isDashboard
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1">
                    <SubscriptionForm
                        members={members?.members}
                        sports={sports?.sports}
                    />
                </div>
                <div className="lg:col-span-2">
                    <SubscriptionsDashboard />
                </div>
            </div>
        </ContainerLayout>
    </>;
};

export default page;