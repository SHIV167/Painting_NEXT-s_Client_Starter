'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { paintings } from '@/lib/data';
import { FiArrowRight, FiEye, FiPlay, FiX } from 'react-icons/fi';
import HeroSlider from '@/components/HeroSlider';
import { useState } from 'react';

export default function Home() {
  const featuredPaintings = paintings.slice(0, 3);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/VFrK2TM3gjk?autoplay=1');
  const [thumbnailError, setThumbnailError] = useState(false);

  const categoryItems = [
    {
      image: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740759/art-gallery/Cropped_Image_1_jpg.jpg',
      title: 'Traditional Art',
      description: 'Explore our collection of traditional Indian artworks'
    },
    {
      image: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740760/art-gallery/phad1_png.png',
      title: 'Phad Paintings',
      description: 'Rajasthani folk art depicting mythological stories'
    },
    {
      image: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740761/art-gallery/st-2_png.png',
      title: 'Spiritual Art',
      description: 'Sacred and spiritual artwork for your space'
    },
    {
      image: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740762/art-gallery/1-1new_png.png',
      title: 'Modern Art',
      description: 'Contemporary pieces with modern aesthetics'
    }
  ];

  const heroSlides = [
    {
      desktopImage: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740763/art-gallery/budget_artworks_desktop_jpg.jpg',
      mobileImage: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740764/art-gallery/budget_artworks_mobile_2_jpg.jpg',
      alt: 'Budget Artworks'
    },
    {
      desktopImage: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740766/art-gallery/shark_wall-5_png.png',
      mobileImage: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740767/art-gallery/bannerm10_png.png',
      alt: 'Banner Art'
    },
    {
      desktopImage: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740768/art-gallery/banner10_png.png',
      mobileImage: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740769/art-gallery/tree_of_life_m_jpg.jpg',
      alt: 'Tree of Life'
    },
    {
      desktopImage: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740770/art-gallery/tree_of_life_jpg.jpg',
      mobileImage: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740772/art-gallery/pooja_room_banner-mobile_version_png.png',
      alt: 'Pooja Room'
    },
    {
      desktopImage: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740768/art-gallery/banner10_png.png',
      mobileImage: 'https://res.cloudinary.com/dj15ypnx8/image/upload/v1782740772/art-gallery/gallery_walls_m_jpg.jpg',
      alt: 'Gallery Walls'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <section className="relative w-full">
        <HeroSlider slides={heroSlides} autoplay={true} autoplayDelay={5000} />
      </section>

      {/* Featured Works */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-4">
              Featured Works
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-body">
              Discover our handpicked selection of exceptional paintings from talented Indian artists
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categoryItems.map((item, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover"
                />
                <div className="CollectiondecorOverlay absolute inset-0 bg-black/40 flex items-end justify-center pb-4">
                  <h2 className="Collectiondecor-image-title text-white text-lg md:text-xl font-bold font-heading text-center px-4">
                    {item.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              View All Paintings <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-6">
                About Our Gallery
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-body">
                We are dedicated to promoting contemporary Indian art and connecting artists with art lovers worldwide. 
                Our gallery features a diverse collection of paintings that showcase the rich cultural heritage and 
                modern artistic expressions of India.
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-body">
                From traditional landscapes to abstract expressions, our collection represents the vibrant and 
                evolving art scene in India. We work with both established and emerging artists to bring you 
                the finest contemporary artwork.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all font-display text-sm md:text-base"
              >
                Learn More <FiArrowRight />
              </Link>
            </div>
            <div
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
              onClick={() => {
                setVideoUrl('https://www.youtube.com/embed/VFrK2TM3gjk?autoplay=1');
                setIsVideoOpen(true);
              }}
            >
              <Image
                src={thumbnailError ? '/logo.png' : 'https://img.youtube.com/vi/VFrK2TM3gjk/hqdefault.jpg'}
                alt="Gallery Video Thumbnail"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => setThumbnailError(true)}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <FiPlay className="text-gray-900 text-3xl ml-1" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Popup Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setIsVideoOpen(false)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <FiX size={32} />
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                <iframe
                  className="w-full h-full"
                  src={videoUrl}
                  title="Gallery Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  src={videoUrl}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-pink-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">
            Ready to Explore the Art?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 font-body">
            Visit our gallery or browse our online collection to find the perfect piece for your space.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
          >
            Get in Touch <FiArrowRight />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
