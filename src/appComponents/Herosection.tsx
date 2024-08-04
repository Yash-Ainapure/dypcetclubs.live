import ShimmerButton from "@/components/magicui/shimmer-button";

const Hero: React.FC = () => {

    return (
        <div className="relative text-white flex md:h-[650px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <h1 className="pointer-events-none text-center text-3xl text-slate-200 md:text-7xl font-semibold ">
                        Welcome to dypcetclubs.live
                    </h1>
                    <p className="md:text-xl py-2 text-slate-400 text-center">
                        Discover the vibrant community of clubs at our college,<span className="hidden md:block"> where
                            students come together to </span> explore<span className="md:hidden">,</span> <span className="hidden md:inline">their passions,</span> learn new
                        skills, and make lasting connections.
                    </p>
                    <div className="flex gap-4 justify-center pt-4  text-slate-100">
                        <ShimmerButton className="md:h-16 md:w-48 shadow-2xl">
                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight font-semibold dark:from-white dark:to-slate-900/10 lg:text-lg">
                                Explore Clubs
                            </span>
                        </ShimmerButton>
                        <ShimmerButton className="md:h-16 md:w-48 shadow-2xl">
                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight font-semibold dark:from-white dark:to-slate-900/10 lg:text-lg">
                                Upcoming Events
                            </span>
                        </ShimmerButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
