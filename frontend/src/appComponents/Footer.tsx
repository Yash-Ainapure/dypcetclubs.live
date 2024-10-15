const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="mb-4 text-lg">
            Subscribe to our newsletter to get the latest updates!
          </p>
          <form className="flex flex-col md:flex-row justify-center mb-4">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 mb-2 md:mb-0 md:mr-2 rounded-md focus:outline-none border border-gray-300"
            />
            <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
              Subscribe
            </button>
          </form>
          <ul className="flex flex-wrap justify-center space-x-4 mb-4">
            <li>
              <a href="#" className="hover:text-blue-400 transition duration-300">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition duration-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition duration-300">
                Contact Us
              </a>
            </li>
          </ul>
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" aria-label="GitHub" className="hover:text-blue-400 transition duration-300">
              <i className="fab fa-github fa-lg"></i>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition duration-300">
              <i className="fab fa-facebook-f fa-lg"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition duration-300">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-400 transition duration-300">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition duration-300">
              <i className="fab fa-linkedin-in fa-lg"></i>
            </a>
          </div>
          <p className="mt-4 italic text-gray-400 text-lg">
            Discover the vibrant community of clubs at our college, where students come together to explore their passions, learn new skills, and make lasting connections.
          </p>
          <p className="mt-2">&copy; 2024 dypcetclubs. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  