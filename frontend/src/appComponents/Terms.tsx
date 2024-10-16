"use client";
import { Button } from "@/components/ui/button";
import Footer from "./Footer";
import { Navigation } from "./Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <div className="relative z-10 bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 animate-gradient"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-20">
          <h1 className="text-5xl font-extrabold mb-4">Terms and Conditions</h1>
          <p className="text-xl mb-8">Please read these terms carefully.</p>
          <a href="clubboard">
          <Button className="bg-white text-gray-900 hover:bg-gray-200">
            Back to Clubs
          </Button>
          </a>
        </div>
      </div>

      <Navigation />

      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mt-6 mb-4">1. Introduction</h2>
        <p>
          Welcome to dypcetclubs.live. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, you agree to comply with these terms.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">2. Use of the Service</h2>
        <p>
          You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of the service.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">3. Account Registration</h2>
        <p>
          You may need to create an account to access certain features of our services. You agree to provide accurate and complete information during the registration process and keep your account information updated.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">4. Intellectual Property</h2>
        <p>
          All content, trademarks, and other intellectual property on our website are owned by us or our licensors. You are granted a limited license to access and use the site for personal, non-commercial purposes.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">5. Limitation of Liability</h2>
        <p>
          In no event shall dypcetclubs.live, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms and Conditions on this page.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">7. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of [Your Country/State]. Any legal action or proceeding arising under these terms will be brought exclusively in the courts located in [Your Jurisdiction].
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">8. Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, please contact us:
          <ul className="list-disc ml-6">
            <li><strong>Email:</strong> [DYCETCLUBS@gmail.com]</li>
            <li><strong>Website:</strong> <a href="https://dypcetclubs-live.vercel.app/" className="text-blue-500">dypcetclubs.live</a></li>
          </ul>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
