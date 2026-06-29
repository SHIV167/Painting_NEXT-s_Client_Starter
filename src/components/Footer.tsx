'use client';

import { FiInstagram, FiTwitter, FiMail, FiMapPin, FiFacebook, FiLinkedin, FiYoutube, FiGithub } from 'react-icons/fi';
import Link from 'next/link';
import { theme } from '@/lib/theme';

export default function Footer() {
  return (
    <footer 
      className="text-white"
      style={{
        background: `linear-gradient(135deg, ${theme.primary[900]} 0%, ${theme.primary[800]} 50%, ${theme.secondary[900]} 100%)`
      }}
    >
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
              <span 
                className="text-xl sm:text-2xl font-bold font-display bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.primary[300]}, ${theme.secondary[300]})`
                }}
              >
                Art Gallery
              </span>
            </div>
            <p className="mb-6 leading-relaxed" style={{ color: theme.neutral[200] }}>
              Showcasing contemporary art and connecting artists with art lovers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-base sm:text-lg font-semibold font-display mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.primary[300]}, ${theme.secondary[300]})`
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'About', href: '/about' },
                { name: 'Exhibitions', href: '/exhibitions' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="flex items-center gap-2 group transition-colors"
                    style={{ color: theme.neutral[200] }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.primary[300];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.neutral[200];
                    }}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: theme.primary[400] }}
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="text-base sm:text-lg font-semibold font-display mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.primary[300]}, ${theme.secondary[300]})`
              }}
            >
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3" style={{ color: theme.neutral[200] }}>
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <FiMapPin style={{ color: theme.primary[300] }} />
                </div>
                <div>
                  <p className="font-medium" style={{ color: theme.neutral[100] }}>Address</p>
                  <p className="text-sm">Ghitorni, New Delhi, India</p>
                </div>
              </li>
              <li className="flex items-start gap-3" style={{ color: theme.neutral[200] }}>
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <FiMail style={{ color: theme.primary[300] }} />
                </div>
                <div>
                  <p className="font-medium" style={{ color: theme.neutral[100] }}>Email</p>
                  <p className="text-sm">info@artgallery.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Platforms */}
        <div 
          className="mt-8 md:mt-12 pt-8"
          style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          <h4 
            className="text-base sm:text-lg font-semibold font-display mb-6 text-center bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.primary[300]}, ${theme.secondary[300]})`
            }}
          >
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
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(to right, ${theme.primary[500]}, ${theme.secondary[500]})`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  aria-label={social.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t mt-12 pt-8 text-center"
          style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          <p className="text-sm" style={{ color: theme.neutral[300] }}>
            &copy; {new Date().getFullYear()} Art Gallery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
