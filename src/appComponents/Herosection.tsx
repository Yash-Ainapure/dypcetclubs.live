import { Dock, DockIcon } from "@/components/magicui/dock";

export type IconProps = React.HTMLAttributes<SVGElement>;
const Hero: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col w-full overflow-hidden text-white bg-background md:shadow-xl">
      <div className="flex flex-col items-center justify-start py-24">
        <h1 className="text-6xl font-semibold leading-none text-center">
          Welcome to dypcetclubs.live
        </h1>
        <p className="w-2/5 pt-4 text-center md:text-xl">
          Discover the vibrant community of clubs at our college, where students
          come together to explore,their passions, learn new skills, and make
          lasting connections.
        </p>
        <div className="flex flex-col justify-center gap-4 pt-12 md:flex-row text-slate-200">
          <button className="h-12 px-6 py-2 font-semibold text-black bg-white rounded-md hover:scale-105 transform transition-all duration-500 hover:text-white hover:bg-black hover:border ">
            Explore Clubs
          </button>
          <button className="h-12 px-6 py-2 font-semibold border border-white rounded-md hover:scale-105 transform transition-all duration-500 hover:text-black hover:bg-white hover:border ">
            Upcoming Events
          </button>
        </div>
      </div>
      <div className="z-20 transform transition-all duration-500 fixed top-8 hover:left-[34%] left-[35%] w-[550px] hover:w-[600px]">
        <Dock
          direction="middle"
          magnification={60}
          distance={100}
          className="flex items-center w-full gap-8 p-4 text-base border rounded-lg shadow-xl bg-white/10 backdrop-blur-sm border-white/20"
        >
          <DockIcon>
            <p className="flex items-center font-semibold transition-all duration-300 transform size-full hover:underline">
              Home
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center pr-16 mr-8 font-semibold transition-all duration-300 transform size-full hover:underline">
              Clubs
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center pr-48 font-semibold transition-all duration-300 transform size-full hover:underline whitespace-nowrap">
              Upcoming Events
            </p>
          </DockIcon>
          <DockIcon>
            <p className="flex items-center font-semibold transition-all duration-300 transform size-30 hover:underline">
              Announcements
            </p>
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
};

export default Hero;
