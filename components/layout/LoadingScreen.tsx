
const LoadingScreen = () => {
    return <>
        <div className="size-full fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center h-screen">
                <h3 className="text-2xl md:text-6xl font-semibold text-center my-3">
                    Sporting Club
                </h3>

                <h4 className=" font-medium text-sm">
                    Loading, please wait...
                </h4>
            </div>
        </div>
    </>;
};

export default LoadingScreen;