import ShimmerButton from "@/components/magicui/shimmer-button";
import { Dock, DockIcon } from "@/components/magicui/dock";

export type IconProps = React.HTMLAttributes<SVGElement>;
const Hero: React.FC = () => {

    return (
        <div className="relative z-10 text-white flex w-full flex-col overflow-hidden bg-background md:shadow-xl">
            <div className="flex flex-col items-center min-h-screen justify-start pt-40">
                <h1 className="pointer-events-none text-center font-semibold bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                    Welcome to dypcetclubs.live
                </h1>
                <p className="md:text-xl w-2/5 text-slate-400 text-center">
                    Discover the vibrant community of clubs at our college, where
                    students come together to explore,their passions, learn new
                    skills, and make lasting connections.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center pt-16  text-slate-200">
                    <ShimmerButton className="md:h-16 md:w-48 shadow-2xl hover:scale-105 transform transition-all duration-500 cursor-pointer">
                        <span className="whitespace-no-wrap text-center text-sm font-medium leading-none tracking-tight font-semibold dark:from-white dark:to-slate-900/10 lg:text-lg">
                            Explore Clubs
                        </span>
                    </ShimmerButton>
                    <ShimmerButton className="md:h-16 shadow-2xl hover:scale-105 transform transition-all duration-500 cursor-pointer relative">
                        <span className="whitespace-nowrap text-sm font-medium leading-none tracking-tight font-semibold dark:from-white dark:to-slate-900/10 lg:text-lg pr-8">
                            <p>Upcoming Events</p>
                        </span>
                        <div className="rounded-full absolute right-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#0f172a" className="size-12 bg-white rounded-full">
                                <path d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" />
                            </svg>
                        </div>
                    </ShimmerButton>
                </div>
            </div>
            <div className='z-20 transform transition-all duration-500 fixed top-8 hover:left-[34%] left-[35%] w-[550px] hover:w-[600px]'>
                <Dock direction="middle" magnification={60} distance={100} className='flex items-center bg-white/10 gap-8 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg w-full text-base p-4'>
                    <DockIcon>
                        <p className='size-full flex items-center font-semibold hover:underline transform transition-all duration-300'>Home</p>
                    </DockIcon>
                    <DockIcon>
                        <p className='size-full flex items-center font-semibold hover:underline transform transition-all duration-300 pr-16 mr-8'>Clubs</p>
                    </DockIcon>
                    <DockIcon>
                        <p className='size-full flex items-center font-semibold hover:underline transform transition-all duration-300 whitespace-nowrap pr-48'>Upcoming Events</p>
                    </DockIcon>
                    <DockIcon>
                        <p className='size-30 flex items-center font-semibold hover:underline transform transition-all duration-300'>Announcements</p>
                    </DockIcon>
                </Dock>
            </div>
        </div>
    );
};

export default Hero;
