import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dock, DockIcon } from "@/components/magicui/dock";
import logo from "../assets/dypLogo.png";
import cross from "../assets/cross-icon.svg";
import burger from "../assets/burger-menu.svg";

export type IconProps = React.HTMLAttributes<SVGElement>;

// Navbar component
const Navbar: React.FC<{ setShowLoginPage: (show: boolean) => void }> = ({ setShowLoginPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex items-center justify-between w-full px-4 py-4 text-slate-300 bg-black md:h-28 sm:px-6 lg:px-8">
      {/* ... (rest of the Navbar component code) ... */}
    </div>
  );
};

// Navigation component
const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* ... (rest of the Navigation component code) ... */}
    </div>
  );
};

export { Navbar, Navigation };
