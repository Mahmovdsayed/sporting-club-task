'use client'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from "react";



export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return <>
        <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="sporting-club-theme"
        >
            <Toaster
                position="top-center"
                closeButton={true}
            />
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </NextThemesProvider>
    </>
}