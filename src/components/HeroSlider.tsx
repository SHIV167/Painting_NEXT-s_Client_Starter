'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Slide {
  desktopImage: string;
  mobileImage: string;
  alt: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

export default function HeroSlider({ slides, autoplay = true, autoplayDelay = 5000 }: HeroSliderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative h-screen w-full bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 opacity-90" />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={autoplay ? {
          delay: autoplayDelay,
          disableOnInteraction: false,
        } : false}
        loop={true}
        className="w-full"
        speed={800}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full">
            {/* Desktop Image */}
            <div className="hidden md:block relative w-full">
              <Image
                src={slide.desktopImage}
                alt={slide.alt}
                width={0}
                height={0}
                sizes="100vw"
                priority={index === 0}
                className="w-full h-auto"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            {/* Mobile Image */}
            <div className="block md:hidden relative w-full">
              <Image
                src={slide.mobileImage}
                alt={slide.alt}
                width={0}
                height={0}
                sizes="100vw"
                priority={index === 0}
                className="w-full h-auto"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
          color: #1a1a1a;
          font-weight: bold;
        }
        :is(.swiper-button-prev, .swiper-button-next) ::slotted(svg),
        :is(.swiper-button-prev, .swiper-button-next) svg {
          object-fit: contain;
          transform-origin: center;
          fill: currentColor;
          pointer-events: none;
          width: 49%;
          height: 49%;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: white;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        .swiper-button-next {
          right: 20px;
        }
        .swiper-button-prev {
          left: 20px;
        }
        .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
          border: 2px solid white;
        }
        .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.8);
        }
        .swiper-pagination-bullet-active {
          background: white !important;
          width: 40px;
          border-radius: 7px;
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 40px;
            height: 40px;
          }
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 16px;
          }
          .swiper-button-next {
            right: 10px;
          }
          .swiper-button-prev {
            left: 10px;
          }
        }
      `}</style>
    </div>
  );
}
