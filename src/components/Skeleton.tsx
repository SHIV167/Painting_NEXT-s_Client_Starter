'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export default function Skeleton({
  className = '',
  variant = 'rectangular',
  width = '100%',
  height = '100%',
  count = 1,
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-800 relative overflow-hidden';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  ));

  return <>{skeletons}</>;
}

// Pre-configured skeleton components for common UI patterns
export function HeroSkeleton() {
  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh]">
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton variant="rounded" width="100%" height="200px" />
      <Skeleton variant="text" width="80%" height="20px" />
      <Skeleton variant="text" width="60%" height="16px" />
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg">
      <Skeleton variant="rounded" width="100%" height="100%" />
    </div>
  );
}

export function TextLineSkeleton({ width = '100%' }: { width?: string }) {
  return <Skeleton variant="text" width={width} height="16px" />;
}

export function ButtonSkeleton() {
  return (
    <Skeleton variant="rounded" width="150px" height="48px" />
  );
}

export function AboutSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-4">
        <Skeleton variant="text" width="70%" height="40px" />
        <Skeleton variant="text" width="100%" height="16px" />
        <Skeleton variant="text" width="100%" height="16px" />
        <Skeleton variant="text" width="100%" height="16px" />
        <Skeleton variant="text" width="90%" height="16px" />
        <Skeleton variant="text" width="100%" height="16px" />
        <Skeleton variant="text" width="80%" height="16px" />
        <ButtonSkeleton />
      </div>
      <Skeleton variant="rounded" width="100%" height="400px" />
    </div>
  );
}

export function CTASkeleton() {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-4">
      <Skeleton variant="text" width="60%" height="40px" className="mx-auto bg-white/20 dark:bg-white/10" />
      <Skeleton variant="text" width="80%" height="24px" className="mx-auto bg-white/20 dark:bg-white/10" />
      <div className="flex justify-center mt-4">
        <Skeleton variant="rounded" width="180px" height="48px" className="bg-white/30 dark:bg-white/20" />
      </div>
    </div>
  );
}
