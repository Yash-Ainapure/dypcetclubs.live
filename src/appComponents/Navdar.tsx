import logo from '../assets/dypLogo.png';

export type IconProps = React.HTMLAttributes<SVGElement>;

const Navbar: React.FC = () => {

    return (
        <div className="relative flex items-center justify-between w-full px-4 py-4 text-slate-300 md:h-28 sm:px-6 lg:px-8">
            {/* image-logo */}
            <div className="z-10 flex items-center gap-2">
                <img src={logo} alt="Logo" className="w-10 h-8 transition-all duration-500 transform cursor-pointer md:h-16 md:w-16 hover:scale-110" />
                <h2 className="text-xl font-bold transition-all duration-500 transform cursor-pointer hover:text-white hover:scale-105">dypcetclubs.live</h2>
            </div>
        </div>
    );
}


export default Navbar;
