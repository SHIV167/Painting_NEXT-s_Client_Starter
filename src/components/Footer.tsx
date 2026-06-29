'use client';

import { FiInstagram, FiTwitter, FiMail, FiMapPin, FiFacebook, FiLinkedin, FiYoutube, FiGithub } from 'react-icons/fi';
import Link from 'next/link';
import { theme } from '@/lib/theme';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 border-t-4 border-amber-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Art Gallery Logo"
                width={40}
                height={40}
              />
              <span className="text-xl sm:text-2xl font-bold font-display text-gray-900">
                Art Gallery
              </span>
            </div>
            <p className="mb-6 leading-relaxed text-gray-600">
              Showcasing contemporary art and connecting artists with art lovers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold font-display mb-6 text-gray-900">
              Quick Links
            </h4>
            <ul className="space-y-3 list-none">
              {[
                { name: 'Home', href: '/' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'About', href: '/about' },
                { name: 'Exhibitions', href: '/exhibitions' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name} className="hover:list-none">
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 group transition-colors text-gray-600 hover:text-gray-900"
                  >
                    <span className="w-1.5 h-1.5 rounded-full transition-opacity opacity-0 group-hover:opacity-100 bg-gray-900" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold font-display mb-6 text-gray-900">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100">
                  <FiMapPin className="text-gray-900" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-sm">Ghitorni, New Delhi, India</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100">
                  <FiMail className="text-gray-900" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-sm">info@artgallery.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Platforms */}
        <div className="mt-8 md:mt-12 pt-8 border-t border-gray-200">
          <h4 className="text-base sm:text-lg font-semibold font-display mb-6 text-center text-gray-900">
            Follow Us
          </h4>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { icon: FiFacebook, name: 'Facebook', href: '#' },
              { icon: FiInstagram, name: 'Instagram', href: '#' },
              { icon: FiTwitter, name: 'Twitter', href: '#' },
              { icon: FiLinkedin, name: 'LinkedIn', href: '#' },
              { icon: FiYoutube, name: 'YouTube', href: '#' },
              { icon: FiGithub, name: 'GitHub', href: '#' },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white"
                  aria-label={social.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Art Gallery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
