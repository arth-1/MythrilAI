import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col items-center px-6">
        {/* Logo and Name - Centered and Smaller */}
        <div className="flex flex-col items-center justify-center gap-3 mb-6">
          <img 
            src="Mythril3.png" 
            alt="Mythril AI" 
            className="w-8 h-8" // Adjust the size here
          /> 
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 mb-6">
          <a href="https://www.facebook.com/share/1B2iKke54K/?mibextid=qi2Omg" className="hover:text-gray-400">
            <Facebook size={24} />
          </a>
          <a href="https://x.com/MythrilAi35?t=E_KLN0bnv7FvPvyj-qK9BA&s=09" className="hover:text-gray-400">
            <Twitter size={24} />
          </a>
          <a href="https://www.instagram.com/mythrilai?igsh=aXoyMzNvNmVrNTM2" className="hover:text-gray-400">
            <Instagram size={24} />
          </a>
          <a href="http://www.linkedin.com/in/mythril-ai-7a7681351" className="hover:text-gray-400">
            <Linkedin size={24} />
          </a>
        </div>

        {/* Contact Button */}
        <div className="mb-6">
          <a
            href="mailto:mythrilai35@gmail.com"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            <Mail size={20} /> Contact Us
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-6">
        &copy; {new Date().getFullYear()} Mythril AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;