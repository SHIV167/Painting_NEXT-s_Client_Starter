'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { paintings } from '@/lib/data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import LightGallery from 'lightgallery/react';
import { FiFilter, FiZoomIn } from 'react-icons/fi';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Landscape', 'Abstract', 'Portrait', 'Still Life'];

  const filteredPaintings = selectedCategory === 'All' 
    ? paintings 
    : paintings.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&q=80')] bg-cover bg-center opacity-30" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-4">
            Art Gallery
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 font-body">
            Explore our curated collection of contemporary Indian art
          </p>
        </motion.div>
      </section>

      {/* Featured Carousel */}
      <section className="py-16 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 dark:text-white mb-2">
              Featured Works
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-body">
              Swipe to explore our featured paintings
            </p>
          </motion.div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            className="mySwiper"
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {paintings.map((painting) => (
              <SwiperSlide key={painting.id}>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg group">
                  <Image
                    src={painting.imageUrl}
                    alt={painting.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold font-heading text-white mb-1">{painting.title}</h3>
                    <p className="text-gray-300 font-body">{painting.artist}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Filter and Gallery Grid */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <FiFilter className="text-gray-600 dark:text-gray-400" />
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 dark:text-white">
                Filter by Category
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <LightGallery
            speed={500}
            plugins={[lgZoom, lgThumbnail]}
            elementClassNames="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPaintings.map((painting, index) => (
              <a
                key={painting.id}
                href={painting.imageUrl}
                data-src={painting.imageUrl}
                data-sub-html={`<h4>${painting.title}</h4><p>${painting.artist}</p>`}
                className="group relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={painting.imageUrl}
                      alt={painting.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <FiZoomIn className="text-white text-3xl" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white">
                        {painting.title}
                      </h3>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs rounded-full font-display">
                        {painting.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2 font-body">
                      {painting.artist}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-3 font-body">
                      {painting.medium} • {painting.year}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 font-body">
                      {painting.description}
                    </p>
                  </div>
                </motion.div>
              </a>
            ))}
          </LightGallery>
        </div>
      </section>
    </div>
  );
}
