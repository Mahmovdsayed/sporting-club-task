'use client'
const ContainerLayout = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return <>
        <main className="overflow-x-hidden">
            <div className={`container mx-auto px-4 ${className}`}>
                {children}
            </div>
        </main>
    </>;
};

export default ContainerLayout;