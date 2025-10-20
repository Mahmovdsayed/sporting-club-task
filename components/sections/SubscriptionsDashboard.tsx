'use client'

import { useQuery } from "@tanstack/react-query";
import { getAllSubscriptions } from "@/functions/axios";
import LoadingScreen from "../layout/LoadingScreen";
import ErrorScreen from "../layout/ErrorScreen";
import NoContentAvailable from "../layout/NoContentAvailable";
import SubscriptionsTable from "../ui/SubscriptionsTable";

const SubscriptionsDashboard = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: [`subscriptions-dashboard`],
        queryFn: () => getAllSubscriptions(),
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
    })
    if (isLoading) return <LoadingScreen />;
    if (isError) return <ErrorScreen errorMessage="Error occurred while fetching data." />;

    return <>
        {data && data.data.members?.length === 0 ? (
            <NoContentAvailable title="subscriptions" />
        ) : (
            <div className="space-y-4">
                <SubscriptionsTable subscriptions={data.data.members} />
            </div>
        )}
    </>;
};

export default SubscriptionsDashboard;