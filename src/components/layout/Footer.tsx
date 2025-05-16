import React from 'react';
import { Eye, Github, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Eye size={24} className="text-blue-600" />
              <span className="font-semibold text-lg text-gray-800">
                EyeCare Insights
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Comprehensive eye health education for everyone, powered by the latest research.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/age-groups" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Age Groups
                </Link>
              </li>
              <li>
                <Link to="/myths" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Eye Myths
                </Link>
              </li>
              <li>
                <Link to="/research" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Research
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Eye Health Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Find an Optometrist
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Eye Health Glossary
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  First Aid for Eyes
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">Contact Us</h3>
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} className="text-gray-400" />
              <a href="mailto:info@eyecareinsights.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                info@eyecareinsights.com
              </a>
            </div>
            <p className="text-gray-600 mt-4">
              Sign up for our newsletter to receive eye health tips and updates.
            </p>
            <div className="mt-4 flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} EyeCare Insights. All rights reserved. Powered by Perplexity's Sonar API.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;