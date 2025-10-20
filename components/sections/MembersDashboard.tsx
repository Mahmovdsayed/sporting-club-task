'use client'

import { usePageSync } from "@/hooks/usePageSync";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../layout/LoadingScreen";
import ErrorScreen from "../layout/ErrorScreen";
import { getAllMembers } from "@/functions/axios";
import NoContentAvailable from "../layout/NoContentAvailable";
import CardMotion from "../motion/CardMotion";
import Pagination from "../ui/Pagination";
import MembersTable from "../ui/MembersTable";

const MembersDashboard = () => {
    const { currentPage, setCurrentPage } = usePageSync();
    const { data, isLoading, isError } = useQuery({
        queryKey: [`members-dashboard`, currentPage],
        queryFn: () => getAllMembers(currentPage, 6),
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
    })

    if (isLoading) return <LoadingScreen />;
    if (isError) return <ErrorScreen errorMessage="Error occurred while fetching data." />;

    return <>
        {data && data.data.members?.length === 0 ? (
            <NoContentAvailable title="members" />
        ) : (
            <div className="space-y-4">
                <CardMotion>
                    <MembersTable members={data.data.members} />
                </CardMotion>
            </div >
        )}
        <Pagination
            currentPage={currentPage}
            totalItems={data.data.totalMembers}
            itemsPerPage={6}
            onPageChange={(page) => setCurrentPage(page)}
        />
    </>;
};

export default MembersDashboard;