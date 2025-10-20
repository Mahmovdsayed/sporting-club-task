'use client';

import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage?: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalItems,
    itemsPerPage = 6,
    onPageChange,
}: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center mt-10">
            <div className="flex items-center gap-4 px-5 py-3 rounded-xl shadow-sm bg-card border border-border/50">
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg transition-all hover:scale-105 disabled:opacity-50"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ← Previous
                </Button>

                <div className="text-sm font-medium text-muted-foreground">
                    <span className="text-primary font-semibold">Page {currentPage}</span> of {totalPages}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg transition-all hover:scale-105 disabled:opacity-50"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next →
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
