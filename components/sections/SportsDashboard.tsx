'use client';

import { getAllSportsDashboardData } from "@/functions/axios";
import { usePageSync } from "@/hooks/usePageSync";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../layout/LoadingScreen";
import ErrorScreen from "../layout/ErrorScreen";
import { Sport } from "@/types/sports.types";
import SportsCard from "../ui/SportsCard";
import CardMotion from "../motion/CardMotion";
import NoContentAvailable from "../layout/NoContentAvailable";
import Pagination from "../ui/Pagination";

const SportsDashboard = () => {
    const { currentPage, setCurrentPage } = usePageSync();

    const { data, isLoading, isError } = useQuery({
        queryKey: [`sports-dashboard`, currentPage],
        queryFn: () => getAllSportsDashboardData(currentPage, 6),
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
    })

    if (isLoading) return <LoadingScreen />;
    if (isError) return <ErrorScreen errorMessage="Error occurred while fetching data." />;

    return <>
        {data && data.data.sports?.length === 0 ? (
            <NoContentAvailable title="sports" />
        ) : (
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.data.sports?.map((sport: Sport) => (
                        <CardMotion key={sport._id}>
                            <SportsCard isDashboard id={sport._id} title={sport.name} description={sport.description} />
                        </CardMotion>
                    ))}
                </div>
            </div>
        )}
        <Pagination
            currentPage={currentPage}
            totalItems={data.data.totalSports}
            itemsPerPage={6}
            onPageChange={(page) => setCurrentPage(page)}
        />

    </>;
};

export default SportsDashboard;