"use client";
import { Button } from "@/components/ui/button";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <div className="relative z-10 bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 animate-gradient"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-20">
          <h1 className="text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-xl mb-8">Your privacy is important to us.</p>
          <a href="clubboard">
            <Button className="bg-white text-gray-900 hover:bg-gray-200">
              Back to Clubs
            </Button>
          </a>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mt-6 mb-4">1. Introduction</h2>
        <p>
          Welcome to dypcetclubs.live. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website and services.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">2. Information We Collect</h2>
        <p>
          We may collect the following types of information:
          <ul className="list-disc ml-6">
            <li><strong>Personal Information:</strong> When you register or interact with our services, we may collect personal details such as your name, email address, and contact information.</li>
            <li><strong>Usage Data:</strong> We automatically collect information about how you access and use our services, including your IP address, browser type, pages visited, and the time spent on each page.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">3. How We Use Your Information</h2>
        <p>
          We use the information we collect for various purposes, including:
          <ul className="list-disc ml-6">
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To allow you to participate in interactive features of our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our services</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">4. Sharing Your Information</h2>
        <p>
          We do not sell or rent your personal information to third parties. We may share your information with:
          <ul className="list-disc ml-6">
            <li><strong>Service Providers:</strong> We may employ third-party companies and individuals to facilitate our services, provide the service on our behalf, or perform service-related services.</li>
            <li><strong>Compliance with Laws:</strong> We may disclose your personal information if required to do so by law or in response to valid requests by public authorities.</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">5. Data Security</h2>
        <p>
          The security of your data is important to us, and we strive to implement and maintain reasonable, commercially acceptable security procedures and practices appropriate to the nature of the information we store to protect it from unauthorized access, destruction, use, modification, or disclosure.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">6. Your Data Protection Rights</h2>
        <p>
          You have the right to request access to the personal information we hold about you. You can also request that we correct any inaccuracies in your data or delete your personal information in certain circumstances.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">7. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us:
          <ul className="list-disc ml-6">
            <li><strong>Email:</strong> ainapureyash2@gmail.com</li>
            <li><strong>Website:</strong> <a href="https://dypcetclubs-live.vercel.app/" className="text-blue-500">dypcetclubs.live</a></li>
          </ul>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;