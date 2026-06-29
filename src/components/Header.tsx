'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiHome, FiImage, FiUser, FiCalendar, FiMail } from 'react-icons/fi';
import { theme } from '@/lib/theme';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Gallery', href: '/gallery', icon: FiImage },
    { name: 'About', href: '/about', icon: FiUser },
    { name: 'Exhibitions', href: '/exhibitions', icon: FiCalendar },
    { name: 'Contact', href: '/contact', icon: FiMail },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Art Gallery Logo"
                  width={48}
                  height={48}
                  className="transition-transform group-hover:scale-110"
                />
              </div>
              <span 
                className="text-xl sm:text-2xl font-bold font-display bg-clip-text text-transparent hidden sm:block"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.primary[600]}, ${theme.secondary[600]})`
                }}
              >
                Art Gallery
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 transition-all duration-300 rounded-lg font-medium font-display"
                  style={{ color: theme.neutral[600] }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.primary[600];
                    e.currentTarget.style.backgroundColor = `${theme.primary[50]}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.neutral[600];
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                background: `linear-gradient(to right, ${theme.primary[600]}, ${theme.secondary[600]})`
              }}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 z-50 md:hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                    <img
                      src="/logo.png"
                      alt="Art Gallery Logo"
                      width={40}
                      height={40}
                    />
                    <span 
                      className="text-xl font-bold font-display bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${theme.primary[600]}, ${theme.secondary[600]})`
                      }}
                    >
                      Art Gallery
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiX size={24} className="text-gray-900 dark:text-white" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group"
                          style={{ color: theme.neutral[600] }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `linear-gradient(to right, ${theme.primary[50]}, ${theme.secondary[50]})`;
                            e.currentTarget.style.color = theme.primary[600];
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = theme.neutral[600];
                          }}
                        >
                          <Icon size={20} className="group-hover:scale-110 transition-transform" />
                          <span className="font-medium font-display">{item.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                  <div 
                    className="p-4 rounded-2xl text-white"
                    style={{
                      background: `linear-gradient(to right, ${theme.primary[600]}, ${theme.secondary[600]})`
                    }}
                  >
                    <p className="text-sm font-medium mb-2">Discover Art</p>
                    <p className="text-xs opacity-90">Explore our curated collection of contemporary Indian art</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
