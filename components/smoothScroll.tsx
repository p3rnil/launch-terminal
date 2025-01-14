'use client'
import React from 'react'
import { gsap, useGSAP } from '@/gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children, }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  useGSAP(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      ScrollSmoother.create({
        smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true, // looks for data-speed and data-lag attributes on elements
        smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
      });
    }
  }, {
    dependencies: [pathname],
    revertOnUpdate: true,
  })

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className='flex flex-col items-center flex-1 p-4 sm:p-8'>
          {children}
        </div>
      </div>
    </div>
  );
}
