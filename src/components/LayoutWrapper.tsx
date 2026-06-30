'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import SmoothScroll from './SmoothScroll'
import ScrollToTop from './ScrollToTop'

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const isLogin = pathname?.startsWith('/login')

  if (isAdmin || isLogin) {
    return <>{children}</>
  }

  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
