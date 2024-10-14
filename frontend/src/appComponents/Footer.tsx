const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
        <p className="mb-4">
          Subscribe to our newsletter to get the latest updates!
        </p>
        <form className="mb-4">
          <input
            type="email"
            placeholder="Your email address"
            className="p-2 rounded-l-md focus:outline-none"
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">
            Subscribe
          </button>
        </form>
        <ul className="flex justify-center space-x-4 mb-4">
          <li>
            <a href="#" className="hover:text-blue-400">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">
              Contact Us
            </a>
          </li>
        </ul>
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" aria-label="Facebook" className="hover:text-blue-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-blue-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-400">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <p className="mt-4">&copy; 2024 dypcetclubs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
