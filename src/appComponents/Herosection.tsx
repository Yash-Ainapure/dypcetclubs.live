const Hero: React.FC = () => {

    return (
        <div className="relative text-white flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    {/* <h1 className="text-5xl font-bold mb-4">
                        Welcome to dypcetclubs.live
                    </h1> */}
                    <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/100 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-800/10">
                        Welcome to dypcetclubs.live
                    </h1>
                    <p className="text-xl py-2">
                        Discover the vibrant community of clubs at our college, where
                        students come <br /> together to explore their passions, learn new
                        skills, and make lasting
                        <br /> connections.
                    </p>
                    <div className="flex gap-4 justify-center pt-4">
                        <button className="w-40 h-12 bg-white text-black px-4 py-2 rounded-md font-bold transition duration-300">
                            Explore Clubs
                        </button>
                        <button className="h-12 w-48 bg-blackbg text-white px-4 py-2 rounded-md text-lg font-bold border-2 border-white">
                            Upcoming Events
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
