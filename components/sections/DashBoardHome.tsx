'use client'

import { getDashboardData } from "@/functions/axios";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../layout/LoadingScreen";
import ErrorScreen from "../layout/ErrorScreen";

const DashBoardHome = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [`dashboard`],
        queryFn: () => getDashboardData(),
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
    })

    if (isLoading) return <LoadingScreen />;
    if (isError) return <ErrorScreen errorMessage="Error occurred while fetching data." />;

    return <>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card rounded-lg shadow p-6 border border-border">
                <p className="text-muted-foreground text-sm mb-2">Total Sports</p>
                <p className={`text-4xl font-bold`}>{data?.data?.totalSports}</p>
            </div>
            <div className="bg-card rounded-lg shadow p-6 border border-border">
                <p className="text-muted-foreground text-sm mb-2">Total Members</p>
                <p className={`text-4xl font-bold`}>{data?.data?.totalMembers}</p>
            </div>
        </div>

        <div className="bg-card rounded-lg shadow p-4 md:p-6 mt-6 border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Welcome to Sports Club Management</h2>
            <p className="text-muted-foreground mb-4 text-sm md:text-base">
                Manage your sports club efficiently with our comprehensive management system. Use the navigation menu to:
            </p>
            <ul className="space-y-2 text-muted-foreground text-xs md:text-base">
                <li>
                    <strong>Sports:</strong> Add and manage available sports
                </li>
                <li>
                    <strong>Members:</strong> Manage club members and their information
                </li>
                <li>
                    <strong>Subscriptions:</strong> Subscribe members to sports and track subscriptions
                </li>
            </ul>
        </div>
    </>;
};

export default DashBoardHome;