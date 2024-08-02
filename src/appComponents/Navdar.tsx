import logo from '../assets/dypLogo.png';

const Navbar: React.FC = () => {

    return (
        <div className="relative flex text-white items-center justify-between h-28 px-4 sm:px-6 lg:px-8 w-full">
            {/* image-logo */}
            <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-16 w-16" />
                <h2 className="text-xl font-bold">dypcetclubs.live</h2>
            </div>
            {/* nav-items */}
            <div className="flex items-center">
                <ul className="flex gap-6 text-xl font-semibold">
                    <li className="hidden md:block hover:scale-110 transform transition-all duration-500 cursor-pointer">Home</li>
                    <li className="hidden md:block hover:scale-110 transform transition-all duration-500 cursor-pointer">Clubs</li>
                    <li className="hidden md:block hover:scale-110 transform transition-all duration-500 cursor-pointer">Upcoming Events</li>
                    <li className="hidden md:block hover:scale-110 transform transition-all duration-500 cursor-pointer">Announcements</li>
                    <li className="hover:underline hover:scale-110 transform transition-all duration-500 cursor-pointer">Hiring</li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
