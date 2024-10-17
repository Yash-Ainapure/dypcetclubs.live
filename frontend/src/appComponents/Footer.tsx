import { useState } from 'react';
import { Link } from "react-router-dom";
import playstore from "../assets/dypLogo.png";
import { FaGithub, FaRegCopyright, FaDiscord, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Corrected import for Twitter icon

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    // Define company links with distinct paths
    const companyLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
    ];

    // Define quick links
    const quickLinks = [
        { name: 'Clubs', path: '/clubboard' },
        { name: 'Events', path: '/events' },
        { name: 'Hirings', path: '/hiring' },
    ];

    // Define social media links
    const socialMedia = [
        { Icon: FaGithub, link: 'https://github.com/Yash-Ainapure/dypcetclubs.live', color: '#333' },
        { Icon: FaDiscord, link: '#', color: '#7289DA' },
        { Icon: FaXTwitter, link: '#', color: '#1DA1F2' }, // Updated to FaTwitter
        { Icon: FaLinkedinIn, link: '#', color: '#0077B5' },
    ];

    // Define legal links with their paths if available
    const legalLinks = [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms and Conditions', path: '/terms' },
    ];

    const handleRating = (value: any) => {
        setRating(value);
    };

    const submitRating = () => {
        alert(`Thank you for rating us ${rating} out of 5! Comment: ${comment}`);
        setIsModalOpen(false);
        setRating(0);
        setComment('');
    };

    return (
        <footer className='bg-white p-8 text-black'>
            <div className='px-4 py-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* Company Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group transition-all duration-300 ease-in-out transform hover:scale-105">
                            <img src={playstore} className="bg-black h-20 w-20 transition-transform duration-300 group-hover:rotate-12" alt="DYPCETCLUBS.LIVE Logo" />
                            <span className="text-xl font-semibold bg-gradient-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-purple-800 transition-all duration-300">
                                DYPCETCLUBS.LIVE
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs hover:scale-105 transition-transform">
                        <b>dypcetclubs.live</b> is a robust web application designed to simplify the management of college clubs.
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-purple-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Company</h3>
                        <ul className='space-y-2'>
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className='flex items-center group'>
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">›</span>
                                        <span className="relative overflow-hidden">
                                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
                                            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-purple-600">{link.name}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col">
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-purple-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>
                            Quick Links
                        </h3>
                        <ul className='space-y-2'>
                            {quickLinks.map((link) => (
                                <li key={link.name} className="w-full">
                                    <Link to={link.path} className='flex items-center group'>
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">›</span>
                                        <span className="relative overflow-hidden">
                                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
                                            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-purple-600">{link.name}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect with Us and Legal */}
                    <div>
                        {/* Social Media Links */}
                        <h3 className='text-lg font-semibold mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-purple-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Connect with us</h3>
                        <div className='flex space-x-4 mt-4'>
                            {socialMedia.map(({ Icon, link, color }, index) => (
                                <a
                                    key={index}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                                    style={{
                                        backgroundColor: 'white',
                                        color: color,
                                        boxShadow: '0 0 0 0 rgba(255,255,255,0.7)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = color;
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.boxShadow = `0 0 0 8px rgba(255,255,255,0.3)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = color;
                                        e.currentTarget.style.boxShadow = '0 0 0 0 rgba(255,255,255,0.7)';
                                    }}
                                    aria-label={`Social media link ${index + 1}`}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>

                        {/* Legal Links */}
                        <h3 className='text-lg font-semibold mt-6 mb-4 relative inline-block after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-purple-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full'>Legals</h3>
                        <ul className='space-y-2'>
                            {legalLinks.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className='flex items-center group'>
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">›</span>
                                        <span className="relative overflow-hidden">
                                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item.name}</span>
                                            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-purple-600">{item.name}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='mt-8 pt-8 border-t border-white/30 text-center'>
                    <p className='flex items-center justify-center text-sm'>
                        Copyright <FaRegCopyright className='mx-1' /> {currentYear} All Rights Reserved <span className="font-bold ml-2 bg-white text-blue-800 px-2 py-1 rounded transition-all duration-300 hover:bg-blue-800 hover:text-white">DYCETCLUBS.LIVE</span>
                    </p>
                </div>

                {/* Rate Us Button */}
                <div className="text-center mt-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-purple-600 text-white font-semibold py-2 px-4 rounded transition-all duration-300 transform hover:bg-purple-300"
                    >
                        ★&nbsp;Rate Us
                    </button>
                </div>
            </div>

            {/* Rating Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4 text-center text-black">Rate Us</h2>
                        <div className="flex justify-center mb-4">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span key={value} className={`cursor-pointer text-2xl ${rating >= value ? 'text-purple-500' : 'text-gray-300'}`} onClick={() => handleRating(value)}>
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            className="w-full border text-black border-gray-300 rounded p-2 mb-4"
                            rows={5}
                            placeholder="Write your comments here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <div className="flex justify-around">
                            <button
                                onClick={submitRating}
                                className="bg-purple-500 text-white font-semibold py-2 px-2 rounded transition-all duration-300 transform hover:bg-purple-600"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-purple-600 text-white font-semibold py-2 px-2 rounded transition-all duration-300 transform hover:bg-purple-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </footer>
    );
};

export default Footer;